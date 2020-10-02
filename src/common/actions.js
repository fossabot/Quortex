export default {
	successSignup(swal, code, status, router) {
		if (status == true && code == 200) {
			swal.fire({
				icon: "success",
				title: "Success",
				text: "Account successfully created, \nPlease signin to continue.",
			});
			router.push("/Signin");
		}
	},
	successSignin(swal, code, status, router) {
		if (status == true && code == 200) {
			router.push("/home");
		}
	},
	errorSignup(swal, code, status) {
		if (status == false && code == 531) {
			swal.fire({
				icon: "error",
				title: "Oops..",
				text: "Email Id already exists, please try again with different email.",
			});
		}
	},
	errorSignin(swal, code, status) {
		if (status == false && code == 532) {
			swal.fire({
				icon: "error",
				title: "Oops..",
				text: "Incorrect username or password, please try again.",
			});
		}
	},
	successQuestionPost(code, status) {
		if (status == true && code == 200) {
			return true;
		}
		return false;
	},
	errorQuestionPost(code, status, router, swal) {
		// TO DO : error code for invalid token and invalid userId.
		if (!this.checkSignedIn() || code == 555) {
			this.invalidate();
			swal.fire({
				icon: "info",
				title: "Logged out",
				text: "You're logged out of questa, please login to continue.",
			});
			router.push("/signin");
			return;
		}
	},
	successForgotPassword(swal, code, status) {
		if (status == true && code == 200) {
			swal.fire({
				icon: "success",
				title: "Success",
				text:
					"Password is successfully sent to your email Id, \nPlease signin to continue.",
			});
		} else if (status == true && code == 550) {
			swal.fire({
				icon: "error",
				title: "Profile not found",
				text: "There is no account registered with this mail id.",
			});
		}
	},
	invalidate() {
		localStorage.setItem("questauserId", "");
		localStorage.setItem("questatoken", "");
	},
	checkSignedIn() {
		var token = localStorage.getItem("questatoken");
		var questauserId = localStorage.getItem("questauserId");
		if (
			token != null &&
			token.length != 0 &&
			questauserId != null &&
			questauserId.length != 0
		) {
			return true;
		}
		return false;
	},
	fireLoggedOut(swal, router) {
		this.invalidate();
		swal.fire({
			icon: "info",
			title: "Logged out",
			text: "You're logged out of questa, please login to continue.",
		});
		router.push("/signin");
	},
};
