
  // porfile js
document.addEventListener('DOMContentLoaded', () => {
    const profile = document.querySelector(".nav_badge .light");
    const myname = document.querySelector(".itsme_5");
  
    profile.addEventListener("mouseenter", () => {
      myname.style.display = "block";
    });
    profile.addEventListener("mouseleave", () => {
      myname.style.display = "none";
      });
  });


  



function showHideElement(triggerSelector, targetSelector) {
  const trigger = document.querySelector(triggerSelector);
  const target = document.querySelector(targetSelector);

  trigger.addEventListener("mouseenter", () => {
    target.style.display = "block";
  });

  trigger.addEventListener("mouseleave", () => {
    target.style.display = "none";
  });
}

document.addEventListener('DOMContentLoaded', () => {
  showHideElement(".lib_option", ".itsme");
  showHideElement(".theplus", ".itsme_2");
  showHideElement(".shomore", ".itsme_3");
  showHideElement(".bell", ".itsme_4");
  showHideElement(".nav_badge .light", ".itsme_5");
});
