window.addEventListener("load", function(){
	lenisAnimation();

	document.body.classList.add("fixed");

	let intro=document.querySelector(".intro");

	setTimeout(function(){
		document.body.classList.remove("fixed");
		
		gsap.to(intro, { opacity: 0, duraton: 2, onComplete: function(){
			intro.remove();
		}});
	}, 3000);

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

	pageList.forEach(function(item, i){
		gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top center",
				end: "bottom center",
				// markers: true,
				onEnter: function(){
					controlMenu(i);
				},
				onEnterBack: function(){
					controlMenu(i);
				}
			}
		});
    });

	tab.addEventListener("click", function(e){
		e.preventDefault();

		// document.body.classList.toggle("fixed");
		tab.classList.toggle("active");
		mobile.classList.toggle("active");
		dim.classList.toggle("active");
	});

	let movingHeight;
	let textflowList=document.querySelectorAll("#skills .text_zone li");

	function getMovingHeight(){
		movingHeight=document.querySelector("#skills .num_right li span").clientHeight;
	}

	getMovingHeight();

	window.addEventListener("resize", function(){
		if(window.innerWidth > 720 && tab.classList.contains("active")){
			tab.classList.remove("active");
			mobile.classList.remove("active");
			dim.classList.remove("active");
		}

		getMovingHeight();
	});

	/* header */
	const headerTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#header .main_box",
			start: "top center",
			// markers: true
		}
	});

	headerTl.from("#header .text_zone img, #header .text_zone p", { y: -200, opacity: 0, duration: 1 });

	headerTl.from("#header .button_zone a ", { y: 20, opacity: 0, duration: 0.6 });

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
	gsap.to(".moving_frame .column.first", { y: -1*trackHeight, duration: 70, repeat: -1, ease: "none" });

	gsap.set(".moving_frame .column.second", { y: 0 });
	gsap.to(".moving_frame .column.second", { y: -1*trackHeight, duration: 65, repeat: -1, ease: "none" });

	gsap.set(".moving_frame .column.third", { y: 0 });
	gsap.to(".moving_frame .column.third", { y: -1*trackHeight, duration: 60, repeat: -1, ease: "none" });

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

	/* icon slider */
	let sliderCont=document.querySelector(".icon_container .slider_inner");
	let slider=document.querySelector('.icon_container .slider');
	let sliderclone=slider.cloneNode(true);
	sliderCont.appendChild(sliderclone);

	gsap.to(sliderCont, {
		x: -1*slider.clientWidth,
		duration: 50,
		repeat: -1,
		ease: "none"
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
	
	/* skills */
	function listNumCheck(n){
		gsap.to(".num_right ul", { y: -1*movingHeight*(n+0), duration: 0.6, delay: 0.2, ease: "Power3Out" });
	}

	textflowList.forEach(function(item, i){
		gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top 60%",
				// markers: true,
				onEnter: function(){
					console.log("enter : "+i);

					listNumCheck(i);
				},
				onEnterBack: function(){
					console.log("enter back : "+i);

					listNumCheck(i);
				},
			}
		});
	});

	/* project intro moving */
	let track=document.querySelector(".project_intro .title");
	let trackText=track.firstElementChild;
	let clone=trackText.cloneNode(true);
	track.appendChild(clone);

	gsap.to(track, {
		x: -1*trackText.clientWidth,
		duration: 50,
		repeat: -1, // infinite
		ease: "none"
	});

	/* project */
	const projectTl1=gsap.timeline({
		scrollTrigger: {
			trigger: "#project",
			start: "-10% 50%",
			end: "0% 50%",
			scrub: 0,
			// markers: true
		}
	});

	projectTl1.to("#project .first", { width: "100%" }, "a");

	const projectT2=gsap.timeline({
		scrollTrigger: {
			trigger: "#project",
			start: "0 0",
			end: "100% 100%",
			scrub: 0,
			// markers: true
		}
	});

	projectT2
	.to("#project .second", { transform: "translateY(0)" }, "a+=0.1")
	.to("#project .second", { width: "100%" }, "a")
	.to("#project .first .image-wrap", { opacity: 0 }, "a+=0.1")
	.to("#project .third", { transform: "translateY(0)" }, "b")
	.to("#project .third", { width:"100%"}, "b")
	.to("#project .second .image-wrap", { opacity: 0 }, "b-=0.1")
	// .to("#project .fourth", { transform: "translateY(0)" }, "c")
	// .to("#project .fourth", { width: "100%" }, "c")
	// .to("#project .third .image-wrap", { opacity: 0 }, "c")


	/* opensource */
	const opensourceTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#opensource",
			start: "top center",
			// markers: true
		}
	});

	opensourceTl.from("#opensource .title", { y: 20, opacity: 0, duration: 0.5 });

	opensourceTl.from("#opensource .content", { y: 20, opacity: 0, duration: 1.5 });

	new Swiper("#opensource .swiper", {
		loop: true,
		speed: 2000,
		slidesPerView: 1.5,
		centeredSlides: true,
		spaceBetween: 20,
		autoplay: {
			delay: 2000
		},
		breakpoints: {
			760: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			1420: {
				slidesPerView: 4.5,
				spaceBetween: 15
			}
		}
	});
});