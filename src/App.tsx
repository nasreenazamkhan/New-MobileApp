import React, { useEffect, Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

// /* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

// /* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
// import "./styles/dimensions.css";
import "./styles/base_layout.scss";
import "./styles/item_attributes.scss";

import { connect } from "./data/connect";
import { AppContextProvider } from "./data/AppContext";
import { loadConfData } from "./data/sessions/sessions.actions";
import {
  setIsLoggedIn,
  setUsername,
  loadUserData,
} from "./data/user/user.actions";
import { Schedule } from "./models/Schedule";
import RedirectToLogin from "./components/RedirectToLogin";
import ProfileMenu from "./pages/profilemenu/ProfileMenu";
import Start from "./pages/start/Start";
import Spinner from "./components/Spinner";
import ApplicationState from "./components/ApplicationState";
import SavedDrafts from "./pages/SaveDraft/SavedDrafts";

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  schedule: Schedule;
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const MainTabsAsync = React.lazy(() => import("./pages/MainTabs"));
const InvoiceTabsAsync = React.lazy(
  () => import("./pages/ManualInvoice/InvoiceTabs/InvoiceTabs")
);
const BookTruckAsync = React.lazy(
  () => import("./pages/booktruck/BookTruckTab")
);
const DeclarationAsync = React.lazy(
  () => import("./pages/declaration/Declaration")
);
const ProfileAsync = React.lazy(() => import("./pages/profile/Profile"));
const QuickBookAsync = React.lazy(() => import("./pages/quickbook/QuickBook"));
const LoginAsync = React.lazy(() => import("./pages/login/Login"));
const NotificationsAsync = React.lazy(
  () => import("./pages/pushNotification/Notifications")
);
const StatusAsync = React.lazy(() => import("./pages/myBooking/status/Status"));
const MyBookingDetailsAsync = React.lazy(
  () => import("./pages/myBooking/bookingDetails/BookingDetails")
);
const confirmDetailsAsync = React.lazy(
  () => import("./pages/confirmDetails/ConfirmDetails")
);
const BookingContainerAsync = React.lazy(
  () => import("./pages/myBooking/containerDetails/ContainerDetails")
);
const AddNewAddressAsync = React.lazy(
  () => import("./pages/address/addAddress/AddNewAddress")
);
const ContainerCartAsync = React.lazy(
  () => import("./pages/ContainerCart/ContainerCart")
);

const ContainerAsync = React.lazy(() => import("./pages/Containers/Container"));
const SavedDraftsAsync = React.lazy(
  () => import("./pages/SaveDraft/SavedDrafts")
);

const OpenSearchAsync = React.lazy(
  () => import("./pages/declaration/SearchPage/DeclSearch")
);

const TrackAsync = React.lazy(() => import("./pages/Track/Track"));

const IonicApp: React.FC<IonicAppProps> = ({
  darkMode,
  schedule,
  setIsLoggedIn,
  setUsername,
  loadConfData,
  loadUserData,
}) => {
  useEffect(() => {
    loadUserData();
    loadConfData();
    // eslint-disable-next-line
  }, []);
  return schedule.groups.length === 0 ? (
    <div></div>
  ) : (
    <IonApp className={`${darkMode ? "dark-theme" : ""}`}>
      <Spinner />
      <IonReactRouter>
        <ApplicationState />
        <IonSplitPane contentId="main">
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            {/*
                We use IonRoute here to keep the tabs state intact,
                which makes transitions between tabs and non tab pages smooth ContainerCart
                */}
            {/* <Route path="/tabs"  render={() => <MainTabs />} /> */}
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/start" component={MainTabsAsync} />
              <Route path="/tabs" component={MainTabsAsync} />
              <Route
                path="/invoicetabs"
                render={(props) => <InvoiceTabsAsync {...props} />}
              />

              <Route
                path="/bookTruckTab"
                component={BookTruckAsync}
                //exact={true}
              />

              <Route path="/decl" component={DeclarationAsync} />
              <Route path="/profile" component={ProfileAsync} />
              <Route path="/confirmDetails" component={confirmDetailsAsync} />
              <Route path="/profilemenu" component={ProfileMenu} />
              <Route path="/quickBook" component={QuickBookAsync} />
              <Route path="/login" component={LoginAsync} />
              <Route path="/notifications" component={NotificationsAsync} />
              <Route path="tabs/status" component={StatusAsync} />
              <Route path="/container" component={ContainerAsync} />
              <Route
                path="/bookingDetails/:status"
                component={MyBookingDetailsAsync}
              />
              <Route
                path="/containerDetails"
                component={BookingContainerAsync}
              />
              <Route path="/containerCart" component={ContainerCartAsync} />
              {/* <Route path="/contactDetails" component={ContactContainerAsync} /> */}
              <Route path="/addAddress" component={AddNewAddressAsync} />

              <Route
                path="/logout"
                render={() => {
                  return (
                    <RedirectToLogin
                      setIsLoggedIn={setIsLoggedIn}
                      setUsername={setUsername}
                    />
                  );
                }}
              />
              <Route path="/savedDrafts" component={SavedDraftsAsync} />
              <Route path="/track" component={TrackAsync} />

              <Route path="/" component={LoginAsync} exact />
              <Route path="/openSearch" component={OpenSearchAsync} />
            </Suspense>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule,
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setIsLoggedIn,
    setUsername,
  },
  component: IonicApp,
});
