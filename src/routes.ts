export const routes = [
    {
        path: "/login",
        component: "LoginPage",
        isProtected: false,
    },
    {
        path: "/register",
        component: "RegisterPage",
        isProtected: false,
    },
    {
        path: "/forgot-password",
        component: "ForgotPasswordPage",
        isProtected: false,
    },
    {
        path: "/reset-password/:token",
        component: "ResetPasswordPage",
        isProtected: false,
    },
    {
        path: "/favorites",
        component: "FavoritesPage",
        isProtected: true,
    },
    {
        path: "/imdbSearch",
        component: "AddByImdbPage",
        isProtected: true,
    },
    {
        path: "/search",
        component: "AddByNamePage",
        isProtected: true,
    },
    {
        path: "/upcoming",
        component: "UpcomingPage",
        isProtected: true,
    },
    {
        path: "/profile",
        component: "ProfilePage",
        isProtected: true,
    }
];