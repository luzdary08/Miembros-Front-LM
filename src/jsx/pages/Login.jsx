import React, { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import { loadingToggleAction, loginAction } from '../../store/actions/AuthActions';
// image
import logo2 from "../../assets/images/logo-full-white.png";
import login from "../../assets/images/login-bg-1.jpg";
import cogop from "../../assets/images/logo_cogop.png";
function Login(props) {
	let year = new Date().getFullYear();
	const [email, setEmail] = useState('elvis');
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('g@G123mh');

	const dispatch = useDispatch();
	const Nav = useNavigate();

	const onLogin = async (e) => {
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (email === '') {
			errorObj.email = 'Usuario is Required';
			error = true;
		}
		if (password === '') {
			errorObj.password = 'Password is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
		dispatch(loadingToggleAction(true));
		dispatch(loginAction(email, password, Nav));
	}

	return (
		<div className="login-wrapper">

			<div className="login-aside-right">
				<div className="row m-0 justify-content-center h-100 align-items-center">
					<div className="col-xl-6 col-xxl-8">
						<div className="authincation-content">
							<div className="row no-gutters">
								<div className="col-xl-12">
									<div className="auth-form">
										<div className=" mb-3">
											<h2 className="text-primary text-center">Bienvenidos</h2>
										</div>
										{props.errorMessage && (
											<div className='text-danger'>
												{props.errorMessage}
											</div>
										)}
										{props.successMessage && (
											<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
												{props.successMessage}
											</div>
										)}
										<form onSubmit={onLogin}>
											<div className="form-group mb-3">
												<label className="mb-2 ">
													<strong>Usuario</strong><span className="required"> *</span>
												</label>
												<input type="text" className="form-control"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
												{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
											</div>
											<div className="form-group mb-3">
												<label className="mb-2 "><strong>Password</strong> <span className="required"> *</span></label>
												<input
													type="password"
													className="form-control"
													value={password}
													onChange={(e) =>
														setPassword(e.target.value)
													}
												/>
												{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
											</div>
											<div className="text-center">
												<button
													type="submit"
													className="btn btn-primary btn-block"
												>
													Iniciar
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {

	return {
		errorMessage: state.auth.errorMessage,
		successMessage: state.auth.successMessage,
		showLoading: state.auth.showLoading,
	};
};
export default connect(mapStateToProps)(Login);
