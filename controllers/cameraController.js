module.exports = {
	monitoring: (req, res) => {
		res.render("./camera/monitor.ejs");
	},
	recording: (req, res) => {
		res.render("./camera/camera.ejs");
	}
}