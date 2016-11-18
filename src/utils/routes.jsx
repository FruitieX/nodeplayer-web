let MenuRoutes = {
  '/': 'routeHome',
  '/queue': 'routeQueue',
  '/search': 'routeSearch'
};

let MiscRoutes = {
  '/login': 'routeLogin',
  '/sessions/:id': 'routeFeedbackDetails',
  '/preferences': 'routePreferences',
  '/logout': 'routeLogout'
};

export { MenuRoutes, MiscRoutes };
