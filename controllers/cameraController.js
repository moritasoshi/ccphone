const DOMAIN_NAME = process.env.DOMAIN_NAME || 'localhost'

module.exports = {
	monitoring: (req, res) => {
		res.render("./camera/monitor.ejs", {DOMAIN_NAME: DOMAIN_NAME});
	},
	recording: (req, res) => {
		res.render("./camera/record.ejs", {DOMAIN_NAME: DOMAIN_NAME});
	}
}