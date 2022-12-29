$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
	$('#sidebar').toggleClass('active');
	$('#sidebarCollapse').toggleClass('open');
    });
    var btns = $("#sidebar .list-unstyled li a");
    for (var i = 0; i < btns.length; i++) {
	var current = $(".active");
	if(current && current.length>0 && current[0]) {
	    current[0].classList.remove("active");
	}
	btns[i].classList.add("active");
    }
    
    // Pass in the id of an element
    let confetti = new Confetti('content');
    
    // Edit given parameters
    confetti.setCount(275);
    confetti.setSize(1);
    confetti.setPower(25);
    confetti.setFade(false);
    confetti.destroyTarget(false);

    setTimeout(function() {
	console.log("in func");
	$('#content').click();
    }, 1000);
});
