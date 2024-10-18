import React, { useContext } from "react";

/// React router dom
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";

//ADMINISTRADOR
import UsuarioAdmin from "./components/administrador/usuario-admin"
import MenuAdmin from "./components/administrador/menu-admin"

//TESORERO

import CuentaIngreso from "./components/principales/tesorero/cuentas-ingresos";
import CuentaEgreso from "./components/principales/tesorero/cuentas-egresos";
import Informe from "./components/principales/tesorero/informes";
import DetalleIngresoDiario from "./components/principales/tesorero/detalles-ingresos-diarios";
import InformePage from "./components/principales/tesorero/informe-page";

//PASTOR
import TableFichaPastoral from "./components/principales/pastor/ficha-pastoral-list";
import FichaPastoral from "./components/principales/pastor/ficha-pastoral";
import InicioPastoral from "./components/principales/pastor/inicio-pastor";
import FichaPastoralAdd from "./components/principales/pastor/ficha-pastoral-add";

//SECRETARIO

import Reportes from "./components/principales/secretario/reportes"
import MiembrosAdd from "./components/principales/secretario/miembros-add"
import MiembrosUpdate from "./components/principales/secretario/miembros-update"
import Miembros from "./components/principales/secretario/miembros";

/// Dashboard
import Home from "./components/Dashboard/Home";

/*
import DashboardDark from "./components/Dashboard/DashboardDark";
import OrderList from "./components/Dashboard/OrderList";
import Event from "./components/Dashboard/Event";
import CustomerList from "./components/Dashboard/CustomerList";
import Analytics from "./components/Dashboard/Analytics";
import Reviews from "./components/Dashboard/Reviews";
import Task from "./components/Dashboard/Task";


/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";


/// CMS Pages
import Content from './components/Cms/Content';
import Menu from './components/Cms/Menu';
import EmailTemplate from './components/Cms/EmailTemplate';
import Blog from './components/Cms/Blog';

import ContentAdd from './components/Cms/ContentAdd';
import AddMail from './components/Cms/AddMail';
import AddBlog from './components/Cms/AddBlog';
import BlogCategory from './components/Cms/BlogCategory';

//Icons
import FlatIcons from "./components/Icons/FlatIcons";
import FeatherIcons from "./components/Icons/FeatherIcons";
import SvgIcons from "./components/Icons/SvgIcons";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";

import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import MediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
import Todo from "./pages/Todo";

/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import Pickers from "./components/Forms/Pickers/Pickers";
import CkEditor from './components/Forms/CkEditor/CkEditor';
import FormValidation  from './components/Forms/FormValidation/FormValidation';

*/

/// Pages
import LockScreen from "./pages/LockScreen";
import EmptyPage from "./components/Dashboard/EmptyPage";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";

//import  Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import TableMiembros from "./components/principales/secretario/table-miembros";

const Markup = () => {

  const allroutes = [

    /// ADMIN
    { url: "usuario-admin", component: <UsuarioAdmin /> },
    { url: "menu-admin", component: <MenuAdmin /> },

    //TESORERO
    { url: "tesorero/cuentas-ingresos", component: <CuentaIngreso /> },
    { url: "tesorero/cuentas-egresos", component: <CuentaEgreso /> },
    /* { url: "tesorero/informes", component: <Informe /> }, */
    { url: "tesorero/informes", component: <InformePage />, childrens: [
      { url: "", component: <Navigate to="listar" replace /> }, // Redirige a "listar" por defecto
      { url: "detalles-ingresos-diarios", component: <DetalleIngresoDiario /> },
      { url: "detalles-egresos-diarios", component: <DetalleIngresoDiario /> },
      { url: "listar", component: <Informe /> },
    ]},

    //PASTOR

    { url: "pastor/ficha-pastoral", component: <FichaPastoral /> , childrens: [
      { url: "", component: <Navigate to="listar" replace />},
      { url: "listar", component: <TableFichaPastoral />},
      { url: "add", component: <FichaPastoralAdd />}
    ] },
    { url: "pastor/inicio-pastor", component: <InicioPastoral/> },


    //SECRETARIO

    { url: "secretario/reportes", component: <Reportes /> },
    { url: "secretario/miembros", component: <Miembros /> , childrens: [
      { url: "", component: <Navigate to="listar" replace />},
      { url: "add", component: <MiembrosAdd/>},
      { url: "update/:id", component: <MiembrosUpdate/>},
      { url: "listar", component: <TableMiembros/>}
    ] },
    { url: "", component: <Home/> },
    { url: "dashboard", component: <Home/> }
    // { url: "secretario/miembros", component: <Miembros>
    //   <Route path='/add' element={<MiembrosAdd/>} />
    // </Miembros>

    //  },


    // { url: "secretario/miembros", component: <Miembros/> },
    // { url: "secretario/miembros/add", component: <MiembrosAdd/> },
    // { url: "secretario/miembros/update/:id", component: <MiembrosUpdate/> },
    // { url: "", component: <Home/> },
    // { url: "dashboard", component: <Home/> },


    /*
    { url: "dashboard-dark", component: <DashboardDark/> },
    { url: "order-list", component: <OrderList/> },
    { url: "event", component: <Event/> },
    { url: "customer", component: <CustomerList/> },
    { url: "analytics", component: <Analytics/> },
    { url: "reviews", component: <Reviews/> },
    { url: "task", component: <Task/> },*/


    /// Apps
    /*
    { url: "app-profile", component: <AppProfile /> },    
    { url: "post-details", component: <PostDetails /> }, 
    { url: "email-compose", component: <Compose /> },
    { url: "email-inbox", component: <Inbox /> },
    { url: "email-read", component: <Read /> },
    { url: "app-calender", component: <Calendar /> },
     */
    /// Shop
    /*
    { url: "ecom-product-grid", component: <ProductGrid /> },
    { url: "ecom-product-list", component: <ProductList /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-product-order", component: <ProductOrder /> },
    { url: "ecom-checkout", component: <Checkout /> },
    { url: "ecom-invoice", component: <Invoice /> },
    { url: "ecom-customers", component: <Customers /> },
    */
    //CSM  Pages
    /*
    { url: 'content', component: <Content/> },
    { url: 'menu', component: <Menu/> },
    { url: 'email-template', component: <EmailTemplate/> },
    { url: 'blog', component: <Blog/> },
    { url: 'add-content', component: <ContentAdd/> },
    { url: 'add-email', component: <AddMail/> },
    { url: 'add-blog', component: <AddBlog/> },
    { url: 'blog-category', component: <BlogCategory/> },
    */
    //Icons
    /*
    { url: 'flat-icons', component: <FlatIcons/> },
    { url: 'svg-icons', component: <SvgIcons/> },
    { url: 'feather', component: <FeatherIcons/> },


   // Chart
    { url: "chart-sparkline", component: <SparklineChart /> },
    { url: "chart-chartjs", component: <ChartJs /> },    
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },

    /// Bootstrap
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-media-object", component: <MediaObject /> },
    { url: "ui-card", component: <UiCards />},
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> }, 

    /// Plugin
    
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },    
    { url: "uc-lightgallery", component: <Lightgallery /> },

  ///Redux
  { url: "todo", component: Todo },
	
    /// Widget
    { url: "widget-basic", component: <Widget /> },

    
    // Form
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-pickers", component: <Pickers /> },
    { url: "form-validation", component: <FormValidation /> },

    /// table	
    { url: "table-datatable-basic", component: <DataTable/> },    
    { url: 'table-filtering', component: <FilteringTable /> },
    { url: 'table-sorting', component: <SortingTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },
    */


    ,{ url: "empty", component: <EmptyPage /> },
  ];


  function NotFound() {
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname
    path = path.split('/')
    path = path[path.length - 1]

    if (url.indexOf(path) <= 0) {
      return <Error404 />
    }
  }
  return (
    <>
      <Routes>
        <Route path='/page-lock-screen' element={<LockScreen />} />
        <Route path='/page-error-400' element={<Error400 />} />
        <Route path='/page-error-403' element={<Error403 />} />
        <Route path='/page-error-404' element={<Error404 />} />
        <Route path='/page-error-500' element={<Error500 />} />
        <Route path='/page-error-503' element={<Error503 />} />
        <Route element={<MainLayout />} >
          {allroutes.map((data, i) => (
            <Route
              key={i}
              path={`${data.url}`}
              element={data.component}
              exact 
            >
              {
                data.childrens?.map((item,index) => (
                  <Route
                      key={index}
                      path={`${item.url}`}
                      element={item.component}
                      exact
                  />
                )) 
              }
            </Route>
          ))}
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
};


function MainLayout() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body" >
        <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
          <Outlet />
        </div>
      </div>
      {/*<Setting />*/}
      <Footer />
    </div>
  )
};

export default Markup;
