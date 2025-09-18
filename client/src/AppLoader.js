import { useState, useEffect } from 'react';
import { axiosBase } from './services/axiosJWTInstance';
import App from './App';
import './AppLoader.css';

const AppLoader = () => {
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Waking up the server...");
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeInRender, setFadeInRender] = useState(false);

    useEffect( () => {
        const warmUp = async () => {
            try{
                setTimeout(() =>{
                    setFadeInRender(true);
                },4000);
;
                await axiosBase.get('/api/health');
                setLoadingText('Almost ready');

                setFadeOut(true);

                setTimeout(() =>{
                    setLoading(false);
                }, 400);
            }
            catch(error){
                console.error("App warm-up failed: ", error);
                setFadeOut(true);

                setTimeout(() =>{
                    setLoading(false);
                }, 1200);
            }
        }

        warmUp();
    },[])


    if(loading){
        return (
            <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
                <div className={`loading-first-load-text ${fadeInRender ? "fade-in-render-deploy" : ""}`}>
                    <p>Since this project is deployed on a free Render instance, the first request may take a bit longer while the server warms up.</p>
                </div>
                <div className="loading-content">
                    <h1> Fresh Order App</h1>
                    <h2 className="loading-title">Getting Things Ready</h2>
                    <p className="loading-text">{loadingText}</p>
                    <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }


    return <App/>
}

export default AppLoader;