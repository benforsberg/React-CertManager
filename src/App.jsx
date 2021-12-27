import "./App.css";
//import Create from "./components/CreateUser";
import UserList from "./components/UserList";
//import Update from "./components/UpdateUser";
import { BrowserRouter as Router, Route, Switch, Link, } from "react-router-dom"; //useParams
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
//import * as IoIcons from "react-icons/io";
//import * as RiIcons from "react-icons/ri";
//import { GrCertificate } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";

import Settings from "./components/Settings";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import CertList from "./components/CertList";
import UpdateUser from "./components/UpdateUser";
import CreateCert from "./components/CreateCert";
import UpdateCert from "./components/UpdateCert";
import ViewUserCerts from "./components/ViewUserCerts";
import GetUser from "./components/GetUser";


function App() {
  return (
    
    <Router>
      <div className="main">
        {/* Source and documentation: https://github.com/azouaoui-med/react-pro-sidebar */}
        <ProSidebar>
          <SidebarHeader className="sidebar-header">
            <h1>CertManager</h1>
          </SidebarHeader>

          <SidebarContent className="sidebar-content">
            {
              <Menu iconShape="circle">
                <MenuItem icon={<FaIcons.FaHome />}>
                  Home
                  <Link to="/" />
                </MenuItem>
                <SubMenu title="Users" icon={<FaIcons.FaUser />}>
                  <MenuItem>
                    Manage Users
                    <Link to="/users" />
                  </MenuItem>
                  <MenuItem>
                    Create User
                    <Link to="/adduser" />
                  </MenuItem>
                </SubMenu>

                <SubMenu title="Certifications" icon={<IoNewspaperOutline />}>
                  <MenuItem>
                    Manage Certs
                    <Link to="/certs" />
                  </MenuItem>
                  <MenuItem>
                    Create Cert
                    <Link to="/addcert" />
                  </MenuItem>
                </SubMenu>

                <MenuItem icon={<AiIcons.AiOutlineSetting />}>
                  Settings
                  <Link to="/settings" />
                </MenuItem>
              </Menu>
            }
          </SidebarContent>
          <SidebarFooter className="sidebar-footer">
            <h4>Copyright 2021 Ben Forsberg</h4>
          </SidebarFooter>
        </ProSidebar>
        <div className="Content"></div>
        <Switch>
          <Route exact path="/" component={Home} />
          {/*Users */}
          <Route exact path="/users" component={UserList} />
          <Route exact path="/adduser" component={CreateUser} />
          <Route exact path="/edituser" component={UpdateUser} />
          <Route exact path="/users/:id" component={GetUser} />
          {/* Certs  */}
          <Route exact path="/user/certs" component={ViewUserCerts} />
          <Route exact path="/certs" component={CertList} />
          <Route exact path="/addcert" component={CreateCert} />
          <Route exact path="/editcert/:id" component={UpdateCert} />

          <Route exact path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
