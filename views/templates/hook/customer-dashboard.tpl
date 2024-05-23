        <div class="card mb-5" style="border-radius: 15px;">
          <div class="card-body p-4">
            <h3 class="mb-3">¡Bienvenido {$customer->firstname} {$customer->lastname}!</h3>
            <div>
                <h1 class="h1 page-title">Categoria: 
                    {if $customer->id_default_group == '4'}
                        <strong><span class=""> VIP</span></strong>
                        {elseif $customer->id_default_group == '3'}
                        <strong><span class="">Club DLDS</span></strong>
                        {elseif $customer->id_default_group == '5'}
                        <strong><span class=""> Franquicias</span></strong>
                        {elseif $customer->id_default_group == '8'}
                        <strong><span class="">Silver</span>
                        {elseif $customer->id_default_group == '9'}
                        <strong><span class="">Gold</span></strong>
                        {elseif $customer->id_default_group == '10'}
                        <strong><span class="">Black</span></strong>
                        {elseif $customer->id_default_group == '26'}
                        <strong><span class="">Astro SPA</span></strong>
                        {elseif $customer->id_default_group == '3'}
                        <strong><span class="">Club DLDS</span></strong>
                        {elseif $customer->id_default_group == '34'}
                        <strong><span class="">Regalos</span></strong>
                        {elseif $customer->id_default_group == '35'}
                        <strong><span class="">Desarrollo</span></strong>
                        {elseif $customer->id_default_group == '36'}
                        <strong><span class="">Tabaquería</span></strong>
                    {/if}
                    </td>
                </h1>
            </div>
            <div class="justify-content-start align-items-center">
              <p class="text-uppercase"> <span
                  class="text-muted"><h6>Razón Social: {$customer->company}</h6></span></p>
            </div>
            <hr class="my-4">

            <div class="d-flex justify-content-start align-items-center">
              <p class="text-uppercase"> <span
                  class="text-muted "><h6>Giro: {$customer->ape}</h6></span></p>
            </div>
          </div>
        </div>
    <br>
    <div class="row customer-dashboard">
      <style>
        .bg-c-blue {
            background: linear-gradient(45deg,#4099ff,#73b4ff);
            color:white;
        }
        
        .bg-c-green {
            background: linear-gradient(45deg,#2ed8b6,#59e0c5);
            color:white;
        }
        
        .bg-c-yellow {
            background: linear-gradient(45deg,#FFB64D,#ffcb80);
            color:white;
        }
        
        .bg-c-pink {
            background: linear-gradient(45deg,#FF5370,#ff869a);
            color:white;
        }
        .card-actually {
            margin-top: 10px;
        }
        .card-actually1 {
            margin-left: 353px;
            margin-top: 10px;
        }
        @media only screen and (max-width: 768px) {
            .card-actually1 {
                margin-left: 0px;
                margin-top: 0px;
            }
        }
        @media only screen and (max-width: 768px) {
            .card-actually {
                margin-top: 0px;
            }
        }
      </style>
    <div class="col-xl-3 col-sm-6 col-12"> 
        <div class="card bg-c-blue">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-pencil primary font-large-2 float-left"></i>
                </div>
                <div class="media-body text-center">
                  <h3>{$totalOrders}</h3>
                  <span>Pedidos Realizados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="col-xl-3 col-sm-6 col-12"> 
        <div class="card bg-c-green">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-pencil primary font-large-2 float-left"></i>
                </div>
                <div class="media-body text-center">
                  <h3>{$totalOrdersMonth}</h3>
                  <span>Pedidos del Mes Actual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="col-xl-3 col-sm-6 col-12"> 
        <div class="card bg-c-yellow">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-pencil primary font-large-2 float-left"></i>
                </div>
                <div class="media-body text-center">
                  <h3>{$productoComprados}</h3>
                  <span>Productos Comprados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="col-xl-3 col-sm-6 col-12" > 
        <div class="card bg-c-pink">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-pencil primary font-large-2 float-left"></i>
                </div>
                <div class="media-body text-center">
                  <h3>{$mediaProductosPorPedido}</h3>
                  <span>Media de Productos por Pedido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <br>
    <div class="col-xl-3 col-sm-6 col-12 card-actually1"> 
        <div class="card bg-c-green">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-pencil primary font-large-2 float-left"></i>
                </div>
                <div class="media-body text-center">
                  <h3>${$comprasMensuales}</h3>
                  <span>Compras del Mes Actual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="col-xl-3 col-sm-6 col-12 card-actually"> 
        <div class="card bg-c-yellow">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-pencil primary font-large-2 float-left"></i>
                </div>
                <div class="media-body text-center">
                  <h3>${$comprasAnuales}</h3>
                  <span>Compras del Año Actual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
 <br>
 <div class="row customer-dashboard">
    <div class="col-xl-6 col-md-12">
      <div class="card">
        <div class="card-content">
          <div class="card-body cleartfix">
            <div class="media align-items-stretch">
              <div class="align-self-center">
                <h1 class="mr-2">${$totalPurchases}</h1>
              </div>
              <div class="media-body text-center" style="margin-left:30px;">
                <h3>Total de Compras</h3>
                <span>Desde tu registro</span>
              </div>
              <div class="align-self-center">
                <i class="icon-heart danger font-large-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-6 col-md-12">
      <div class="card">
        <div class="card-content">
          <div class="card-body cleartfix">
            <div class="media align-items-stretch">
              <div class="align-self-center">
                <h1 class="mr-2">${$totalSavings}</h1>
              </div>
              <div class="media-body" style="margin-left:30px;">
                <h3>Total Ahorrado</h3>
                <span>Desde tu registro</span>
              </div>
              <div class="align-self-center">
                <i class="icon-wallet success font-large-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Tus 6 Marcas más Compradas</h5>
        <ul class="list-group">
          {foreach from=$top6marcas item=marca}
            <li class="list-group-item">
              <a href="{$link->getManufacturerLink($marca.id_manufacturer)}"><strong>{$marca.name}</strong></a>
            </li>
          {/foreach}
        </ul>
      </div>
    </div>
  </div>
  <div class="col-sm-6 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Tus 6 Marcas menos Compradas</h5>
        <ul class="list-group">
          {foreach from=$top6marcaslow item=marca}
            <li class="list-group-item">
              <a href="{$link->getManufacturerLink($marca.id_manufacturer)}"><strong>{$marca.name}</strong></a>
            </li>
          {/foreach}
        </ul>
      </div>
    </div>
  </div>

</div>
<br>
  <div class="row customer-dashboard">
    <div class="col-xl-6 col-md-12">
      <div class="card">
        <div class="card-content">
          <div class="card-body cleartfix">
            <div class="media align-items-stretch">
                {if $customer->website == 'DELIGHT'}
                  <div class="align-self-center">
                     
                    <h1 class="mr-2">+569 3344 5566</h1>
                  </div>
                  <div class="media-body" style="margin-left:30px;">
                    <h3>Asesor <br> Comercial</h3>
                    <span>Felipe <br> Rodriguez</span>
                {elseif $customer->website == 'V1'}
                      <div class="align-self-center">
                         
                        <h1 class="mr-2">+569 3344 5566</h1>
                      </div>
                      <div class="media-body" style="margin-left:30px;">
                    <h3>Asesor <br> Comercial</h3>
                    <span>No Designado<br></span>
                {elseif $customer->website == 'V3'}
                      <div class="align-self-center">
                         
                        <h1 class="mr-2">+569 3344 5566</h1>
                      </div>
                      <div class="media-body" style="margin-left:30px;">
                    <h3>Asesor <br> Comercial</h3>
                    <span>Fernanda <br> Muñoz</span>
                {elseif $customer->website == 'V4'}
                      <div class="align-self-center">
                         
                        <h1 class="mr-2">+569 3344 5566</h1>
                      </div>
                      <div class="media-body" style="margin-left:30px;">
                    <h3>Asesor <br> Comercial</h3>
                    <span>Paula <br> Leyton</span>
                {elseif $customer->website == 'V6'}
                      <div class="align-self-center">
                         
                        <h1 class="mr-2">+569 9352 2750</h1>
                      </div>
                      <div class="media-body" style="margin-left:30px;">
                    <h3>Asesor <br> Comercial</h3>
                    <span>Matias <br> Lastra</span>
                {elseif $customer->website == 'KAM'}
                      <div class="align-self-center">
                         
                        <h1 class="mr-2">+569 7587 9248</h1>
                      </div>
                      <div class="media-body" style="margin-left:30px;">
                    <h3>Asesor <br> Comercial</h3>
                    <span>Nicolas <br> Sepúlveda</span>
                {/if}
              </div>
              <div class="align-self-center">
                <i class="icon-heart danger font-large-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-6 col-md-12">
      <div class="card">
        <div class="card-content">
          <div class="card-body cleartfix">
            <div class="media align-items-stretch">
              <div class="align-self-center">
                <h1 class="mr-2">+569 3344 5566</h1>
              </div>
              <div class="media-body" style="margin-left:30px;">
                <h3>Asesor <br>PostVenta</h3>
                <span>Matias <br>Lastra</span>
              </div>
              <div class="align-self-center">
                <i class="icon-heart danger font-large-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
