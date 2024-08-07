import { useContext, useState } from "react";
import { AuthContext, UserContext } from "../utils/context";
import { Navigate } from 'react-router-dom';

const Connexion = () => {
    const { login } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const { updateUser } = useContext(UserContext);
    const [formData, setFormData] = useState({ identifiant: '', password: '', type: 'admin' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            const { token, user } = response;
            localStorage.setItem('token', token);
            console.log(user)
            updateUser(user);
            setLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    if (loggedIn) {
        return <Navigate to="/Accueil_Hopital" />;
    }

    return (
        <section className="home">
            <div className="content">
                <h2>Coffee Builds Your Mind</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis delectus quia cupiditate amet iusto dignissimos minima perspiciatis? Dolores corrupti laboriosam ratione cupiditate expedita nesciunt, aliquam sunt, tempore distinctio voluptas quae! Officiis, harum nisi. Veritatis sapiente placeat harum unde! Sit.</p>
                <a href="#">Get Started</a>
            </div>

            <div className="wrapper_login">
                <h2>Member Login</h2>
                <div className="login-toggle">
                    <button
                        className={formData.type === 'admin' ? 'active' : ''}
                        onClick={() => setFormData({ ...formData, type: 'user' })}
                    >
                        Admin
                    </button>
                    <button
                        className={formData.type === 'hopital' ? 'active' : ''}
                        onClick={() => setFormData({ ...formData, type: 'hopital' })}
                    >
                        Hopital
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <span className="icon">
                            <ion-icon name="mail-outline"></ion-icon>
                        </span>
                        <input
                            type="text"
                            name="identifiant"
                            value={formData.identifiant}
                            onChange={handleChange}
                            required
                            aria-label="Enter your Identification Number"
                        />
                        <label>Enter your Identification Number</label>
                    </div>
                    <div className="inputBox">
                        <span className="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            aria-label="Enter your Password"
                        />
                        <label>Enter your Password</label>
                    </div>
                    <div className="remember_forgot">
                        <label>
                            <input type="checkbox" name="remember" id="remember" /> Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btnSubmit">Sign In</button>
                    <div className="register_link">
                        <p>Not a Member? <a href="#" className="register">Sign Up Now</a></p>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </section>
    );
};

export default Connexion;