<?php
/**
* 2007-2024 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2024 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

class DashboardClient extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'dashboardclient';
        $this->tab = 'administration';
        $this->version = '1.0.0';
        $this->author = 'Andrés Abarzúa';
        $this->need_instance = 0;

        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Dashboard para Clientes');
        $this->description = $this->l('Con este modulo, desplegamos un dashboard con las ventas de cada cliente y sus ahorros a lo largo del tiempo.');

        $this->confirmUninstall = $this->l('¿Estas seguro de Desinstalarlo?');

        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => '8.0');
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        Configuration::updateValue('DASHBOARDCLIENT_LIVE_MODE', false);

        return parent::install() &&
            $this->registerHook('header') &&
            $this->registerHook('displayBackOfficeHeader') &&
            $this->registerHook('displayMyAccountDashboard');
    }

    public function uninstall()
    {
        Configuration::deleteByName('DASHBOARDCLIENT_LIVE_MODE');

        return parent::uninstall();
    }
    public function hookDisplayBackOfficeHeader()
    {
            $this->context->controller->addJS($this->_path.'views/js/back37.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');

    }
    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }
    private function getTotalSales($customerId)
    {
        $sql = new DbQuery();
        $sql->select('ROUND(SUM(`total_paid_real`), 0) AS `total_sales`');
        $sql->from('orders');
        $sql->where('`id_customer` = ' . (int)$customerId);

        $result = Db::getInstance()->getRow($sql);
        $formattedTotalSales = number_format($result['total_sales'], 0, ',', '.');
        return $formattedTotalSales;
    }

    private function getTotalSavings($customerId)
    {
        $sql = new DbQuery();
        $sql->select('ROUND(SUM(`total_paid_real` - `total_products`), 0) AS `total_savings`');
        $sql->from('orders');
        $sql->where('`id_customer` = ' . (int)$customerId);

        $result = Db::getInstance()->getRow($sql);
        $formattedTotalSavings = number_format($result['total_savings'], 0, ',', '.');
        return $formattedTotalSavings;
    }
    private function getTotalOrders($customerId)
    {
        $sql = new DbQuery();
        $sql->select('COUNT(*) AS total_pedidos');
        $sql->from('orders');
        $sql->where('`id_customer` = ' . (int)$customerId);
        $result = Db::getInstance()->getRow($sql);
        if ($result) {
            return number_format($result['total_pedidos'], 0, ',', '.');
        }
        return '0';
    }
    private function getRecentOrders($customerId)
    {
        $sql = new DbQuery();
        $sql->select('COUNT(*) AS total_pedidos');
        $sql->from('orders');
    
        // Obtener el primer y último día del mes actual
        $firstDayOfMonth = date('Y-m-01 00:00:00');
        $lastDayOfMonth = date('Y-m-t 23:59:59');
    
        // Filtrar pedidos desde el inicio hasta el final del mes actual y por el ID del cliente
        $sql->where('`date_add` >= \'' . pSQL($firstDayOfMonth) . '\' AND `date_add` <= \'' . pSQL($lastDayOfMonth) . '\' AND `id_customer` = ' . (int)$customerId);
    
        $result = Db::getInstance()->getRow($sql);
    
        if ($result) {
            return number_format($result['total_pedidos'], 0, ',', '.');
        }
    
        return '0';
    }
    private function getTotalPurchasesYear($customerId)
    {
        $sql = new DbQuery();
        $sql->select('SUM(total_paid) AS total_compras');
        $sql->from('orders');
    
        // Obtener el primer día del año actual y el último día del año actual
        $firstDayOfYear = date('Y-01-01 00:00:00');
        $lastDayOfYear = date('Y-12-31 23:59:59');
    
        // Filtrar pedidos desde el inicio hasta el final del año actual y por el ID del cliente
        $sql->where('`date_add` >= \'' . pSQL($firstDayOfYear) . '\' AND `date_add` <= \'' . pSQL($lastDayOfYear) . '\' AND `id_customer` = ' . (int)$customerId);
    
        $result = Db::getInstance()->getRow($sql);
    
        if ($result && $result['total_compras'] != null) {
            return number_format($result['total_compras'], 0, ',', '.');
        }
    
        return '0';
    }
    private function getTotalPurchasesMonth($customerId)
    {
        $sql = new DbQuery();
        $sql->select('SUM(total_paid) AS total_compras');
        $sql->from('orders');
    
        // Obtener el primer y último día del mes actual
        $firstDayOfMonth = date('Y-m-01 00:00:00');
        $lastDayOfMonth = date('Y-m-t 23:59:59');
    
        // Filtrar pedidos desde el inicio hasta el final del mes actual y por el ID del cliente
        $sql->where('`date_add` >= \'' . pSQL($firstDayOfMonth) . '\' AND `date_add` <= \'' . pSQL($lastDayOfMonth) . '\' AND `id_customer` = ' . (int)$customerId);
    
        $result = Db::getInstance()->getRow($sql);
    
        if ($result && $result['total_compras'] != null) {
            return number_format($result['total_compras'], 0, ',', '.');
        }
    
        return '0';
    }




    private function getTotalUniqueProductPurchases($customerId)
    {
        // Crear un nuevo objeto de consulta de base de datos
        $sql = new DbQuery();
    
        // Seleccionar el conteo total de productos únicos comprados por el cliente
        $sql->select('COUNT(DISTINCT od.product_id) AS total_productos_unicos');
    
        // Especificar la tabla de detalles de pedidos
        $sql->from('order_detail', 'od');
    
        // Unir con la tabla de pedidos para filtrar por cliente
        $sql->innerJoin('orders', 'o', 'o.id_order = od.id_order');
    
        // Filtrar por ID del cliente
        $sql->where('o.id_customer = ' . (int)$customerId);
    
        // Obtener el resultado de la consulta
        $result = Db::getInstance()->getRow($sql);
    
        // Si hay un resultado, devolverlo
        if ($result) {
            return (int)$result['total_productos_unicos'];
        }
    
        // Devolver cero si no hay resultados
        return 0;
    }

    private function getAverageUniqueProductsPerOrder($customerId)
    {
        // Conexión a la base de datos
        $db = Db::getInstance();
    
        // Primero, contar el número total de pedidos del cliente
        $sqlOrders = new DbQuery();
        $sqlOrders->select('COUNT(DISTINCT id_order) AS total_pedidos');
        $sqlOrders->from('orders');
        $sqlOrders->where('id_customer = ' . (int)$customerId);
        $totalPedidos = $db->getValue($sqlOrders);
    
        // Si no hay pedidos, retornar cero
        if ($totalPedidos == 0) {
            return 0;
        }
    
        // Segundo, contar el número total de productos únicos comprados en todos los pedidos
        $sqlProducts = new DbQuery();
        $sqlProducts->select('COUNT(DISTINCT od.product_id) AS total_productos_unicos');
        $sqlProducts->from('order_detail', 'od');
        $sqlProducts->innerJoin('orders', 'o', 'o.id_order = od.id_order');
        $sqlProducts->where('o.id_customer = ' . (int)$customerId);
        $totalProductosUnicos = $db->getValue($sqlProducts);
    
        // Calcular la media de productos únicos por pedido
        $mediaProductosPorPedido = round($totalProductosUnicos / $totalPedidos, 0);
    
        // Devolver la media
        return $mediaProductosPorPedido;
    }
    private function getTopSixBrandsPurchased($customerId)
    {
        // Crear un nuevo objeto de consulta de base de datos
        $sql = new DbQuery();
    
        // Seleccionar las marcas y contar el número de veces que fueron compradas
        $sql->select('m.name,m.id_manufacturer, COUNT(*) AS total_compras');
        
        // Especificar la tabla de detalles de pedidos y unir con otras tablas necesarias
        $sql->from('order_detail', 'od');
        $sql->innerJoin('orders', 'o', 'o.id_order = od.id_order');
        $sql->innerJoin('product', 'p', 'p.id_product = od.product_id');
        $sql->innerJoin('manufacturer', 'm', 'm.id_manufacturer = p.id_manufacturer');
    
        // Filtrar por ID del cliente
        $sql->where('o.id_customer = ' . (int)$customerId);
    
        // Agrupar por fabricante y ordenar por el número total de compras, de mayor a menor
        $sql->groupBy('m.id_manufacturer');
        $sql->orderBy('total_compras DESC');
    
        // Limitar a 6 resultados
        $sql->limit(6);
    
        // Obtener los resultados de la consulta
        $results = Db::getInstance()->executeS($sql);
    
        // Devolver los resultados
        return $results;
    }
        private function getLowTopSixBrandsPurchased($customerId)
    {
        // Crear un nuevo objeto de consulta de base de datos
        $sql = new DbQuery();
    
        // Seleccionar las marcas y contar el número de veces que fueron compradas
        $sql->select('m.name,m.id_manufacturer, COUNT(*) AS total_compras');
        
        // Especificar la tabla de detalles de pedidos y unir con otras tablas necesarias
        $sql->from('order_detail', 'od');
        $sql->innerJoin('orders', 'o', 'o.id_order = od.id_order');
        $sql->innerJoin('product', 'p', 'p.id_product = od.product_id');
        $sql->innerJoin('manufacturer', 'm', 'm.id_manufacturer = p.id_manufacturer');
    
        // Filtrar por ID del cliente
        $sql->where('o.id_customer = ' . (int)$customerId);
    
        // Agrupar por fabricante y ordenar por el número total de compras, de mayor a menor
        $sql->groupBy('m.id_manufacturer');
        $sql->orderBy('total_compras ASC');
    
        // Limitar a 6 resultados
        $sql->limit(6);
    
        // Obtener los resultados de la consulta
        $results = Db::getInstance()->executeS($sql);
    
        // Devolver los resultados
        return $results;
    }
    public function hookdisplayMyAccountDashboard($params)
    {
        $customer = $this->context->customer;
        $customerId = $customer->id;

        $totalPurchases = $this->getTotalSales($customerId);
        $totalSavings = $this->getTotalSavings($customerId);
        $totalOrders = $this->getTotalOrders($customerId);
        $totalOrdersMonth = $this->getRecentOrders($customerId);
        $mediaProductosPorPedido = $this->getAverageUniqueProductsPerOrder($customerId);
        $productoComprados = $this->getTotalUniqueProductPurchases($customerId);
        $top6marcas = $this->getTopSixBrandsPurchased($customerId);
        $top6marcaslow = $this->getLowTopSixBrandsPurchased($customerId);
        $comprasAnuales = $this->getTotalPurchasesYear($customerId);
        $comprasMensuales = $this->getTotalPurchasesMonth($customerId);
        
        $this->context->smarty->assign([
            'totalPurchases' => $totalPurchases,
            'totalSavings' => $totalSavings,
            'customer' => $customer,
            'totalOrders' => $totalOrders,
            'totalOrdersMonth' => $totalOrdersMonth,
            'mediaProductosPorPedido' => $mediaProductosPorPedido,
            'productoComprados' => $productoComprados,
            'top6marcas' => $top6marcas,
            'top6marcaslow' => $top6marcaslow,
            'comprasAnuales' => $comprasAnuales,
            'comprasMensuales' => $comprasMensuales,
            // ...
        ]);

        return $this->display(__FILE__, 'views/templates/hook/customer-dashboard.tpl');
    }

}
