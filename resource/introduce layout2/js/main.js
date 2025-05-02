window.addEventListener("load", function(){
	lenisAnimation();

	let introduce=document.querySelector("#introduce");
	let columns=introduce.querySelectorAll(".column");

	columns.forEach(function(item){
		let trackArea=item.firstElementChild;
		let clone=trackArea.cloneNode(true);
		item.appendChild(clone);
	});

	gsap.set("#introduce .column.first", { yPercent: 0 });
	gsap.to("#introduce .column.first", { yPercent: -100, duration: 40, repeat: -1, ease: "none" });

	gsap.set("#introduce .column.second", { yPercent: 0 });
	gsap.to("#introduce .column.second", { yPercent: -100, duration: 35, repeat: -1, ease: "none" });

	gsap.set("#introduce .column.third", { yPercent: 0 });
	gsap.to("#introduce .column.third", { yPercent: -100, duration: 30, repeat: -1, ease: "none" });

	const introduceTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#introduce",
			start: "top 70%",
			end: "bottom 70%",
			scrub: 1,
			// markers: true,
			onLeave: function(){
				// console.log("leave");

				introduce.classList.add("hide");
			},
			onEnterBack: function(){
				// console.log("enter back");

				introduce.classList.remove("hide");
			}
		}
	});
});