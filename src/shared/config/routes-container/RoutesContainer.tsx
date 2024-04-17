import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, NotFound404 } from '../../../pages'
import { FunctionComponent, useEffect, useState } from 'react'


type TProtectedRouteElement = {
    element: JSX.Element;
}

const ProtectedRouteElement: FunctionComponent<TProtectedRouteElement> = ({ element }) => {
    const user = localStorage.getItem("currentUser");
    const [userNotLoaded, setUserNotLoaded] = useState(true)
    const [locate, setLocate] = useState('')
    const location = useLocation();

    useEffect(() => {
        setLocate(location.pathname)
        setUserNotLoaded(false)
    }, [])

    if (userNotLoaded) {
        return null;
    } else {
        return user ? element : <Navigate to="/login" replace />;
    }
}

export default function RoutesContainer() {
    const location = useLocation();
    const locationState = location.state as {background?: Location };
    const background = locationState && locationState.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<ProtectedRouteElement element={<HomePage />} />}/>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </>
    )
}