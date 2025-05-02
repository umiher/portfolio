window.addEventListener("load", function(){
	lenisAnimation();

	let header=document.querySelector("#header");
    let menu=header.firstElementChild;
    let gnb=menu.querySelector("#gnb");
    let gnbList=gnb.querySelectorAll("#gnb li");

	let mobile=menu.querySelector(".mobile");
    let mobileGnb=mobile.querySelector("#m_gnb");
    let mobileGnbList=mobile.querySelectorAll("#m_gnb li");

	let tab=menu.querySelector(".tab");
    let dim=menu.querySelector(".dim");

	let section=document.querySelectorAll("section");

	let pageList=[header, ...section];

	function controlMenu(n){
        console.log(n);

        gnbList.forEach(function(item, i){
            if(i == n){
                gnbList[i].classList.add("active");
            }
            else{
                gnbList[i].classList.remove("active");
            }
        });

        if(n != 0){
            menu.classList.add("fixed");
        }
        else{
            menu.classList.remove("fixed");
        }
    }

	tab.addEventListener("click", function(e){
		e.preventDefault();

		tab.classList.toggle("active");
		mobile.classList.toggle("active");
		dim.classList.toggle("active");
	});

    let topPos=0;

	window.addEventListener("resize", function(){
		if(window.innerWidth > 720 && tab.classList.contains("active")){
			tab.classList.remove("active");
			mobile.classList.remove("active");
			dim.classList.remove("active");
		}
	});

	// gnb page duration
	gnbList.forEach(function(item, i){
		gnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			topPos=pageList[i].offsetTop;

			gsap.to(window, { scrollTo: topPos, duration: 0.4 });
		});

		mobileGnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			topPos=pageList[i].offsetTop;

			gsap.to(window, { scrollTo: topPos, duration: 0.4, onComplete: function(){
				tab.classList.remove("active");
				mobile.classList.remove("active");
				dim.classList.remove("active");
			}});
		});
	});

	/* moving frame */
	let movingframe=document.querySelector("#aboutme .moving_frame");
	let columns=movingframe.querySelectorAll(".column");
	let trackHeight;

	columns.forEach(function(item){
		let trackArea=item.firstElementChild;

		trackHeight=trackArea.clientHeight;

		let clone=trackArea.cloneNode(true);
		item.appendChild(clone);
	});

	gsap.set(".moving_frame .column.first", { y: 0 });
	gsap.to(".moving_frame .column.first", { y: -1*trackHeight, duration: 40, repeat: -1, ease: "none" });

	gsap.set(".moving_frame .column.second", { y: 0 });
	gsap.to(".moving_frame .column.second", { y: -1*trackHeight, duration: 35, repeat: -1, ease: "none" });

	gsap.set(".moving_frame .column.third", { y: 0 });
	gsap.to(".moving_frame .column.third", { y: -1*trackHeight, duration: 30, repeat: -1, ease: "none" });

	const movingframeTl=gsap.timeline({
		scrollTrigger: {
			trigger: ".moving_frame",
			start: "top 10%",
			end: "bottom 100%",
			scrub: true,
			// markers: true,
			onLeave: function(){
				// console.log("leave");

				movingframe.classList.add("hide");
			},
			onEnterBack: function(){
				// console.log("enter back");

				movingframe.classList.remove("hide");
			}
		}
	});

	/* header icon */
	const icon=document.getElementById("icon");

	icon.addEventListener('mouseover', function() {
		icon.classList.remove("fa-envelope"); // 기존 아이콘 제거
		icon.classList.add("fa-envelope-open-text"); // 새로운 아이콘 추가
	});

	icon.addEventListener('mouseleave', function() {
		icon.classList.remove("fa-envelope-open-text"); // 새로운 아이콘 제거
		icon.classList.add("fa-envelope"); // 원래 아이콘 추가
	});
});