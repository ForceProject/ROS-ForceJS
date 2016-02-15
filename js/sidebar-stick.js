$.fn.followTo = function (pos) {
	var $this = this,
		$window = $(window);

	$window.scroll(function (e) {
		if ($window.scrollTop() < pos) {
			$this.css({
				position: 'absolute',
				top: $('header').height()

				//($window.height() / 2)
			});
		} else {
			$this.css({
				position: 'fixed',
				top: 48,

				"-webkit-transition": "all 0.0s ease",
				"-moz-transition": "all 0.0s ease",
				"-o-transition": "all 0.0s ease",
				"transition": "all 0.0s ease"

			});
		}
	});
};

$('#sidebar-wrapper').followTo($('header').height() - 48);
