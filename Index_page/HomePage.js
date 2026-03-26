const observer = new IntersectionObserver((e) => {
  e.forEach((es) => {
    console.log(es);
    if (es.isIntersecting) {
      es.target.classList.add("show");
    } else {
      es.target.classList.remove("show");
    }
  });
});

const HiddenEleemt = document.querySelectorAll(".hidden");
HiddenEleemt.forEach((el) => observer.observe(el));

var aboutMe = document.querySelector(".AboutMe");
var index = 0;
var about =
  ` Hi, I’m Mahesan, a Game Developer with hands-on experience in Unity and Unreal
   Engine, specializing in building interactive 2D, 3D, and XR (VR/MR) experiences
   . I work primarily with C# and C++, focusing on creating smooth gameplay mechanics,
    optimized performance, and immersive user interactions.
I enjoy developing real-time interactive applications that combine game development, 
simulation, and extended reality technologies. In my free time, I
 explore Blender to improve my 3D modeling skills and create custom assets for my projects. 
 I’m always learning new tools and techniques to deliver engaging and meaningful digital experiences.`.split(
    "",
  );

strat();

function strat() {
  aboutMe.innerHTML = "";
  for (let i = 0; i < about.length; i++) {
    setTimeout(() => {
      aboutMe.innerHTML += about[i];
    }, i * 10);
  }
}

var skillImg = document.querySelectorAll(".SkillDetailList img");
function getRandom() {
  return Math.floor(Math.random() * 250);
}

skillImg.forEach((img) => {
  img.addEventListener("mouseover", () => {
    img.style.boxShadow = `0px 0px 15px rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`;
    img.innerHTML = img.alt;
  });
  img.addEventListener("mouseout", () => {
    img.style.boxShadow = "none";
  });
});
