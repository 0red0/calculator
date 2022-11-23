const display = document.getElementById("display");
let buttons = Array.from(document.querySelectorAll(".button"));

buttons.map((button) => {
   button.addEventListener("click", (e) => {
      switch (e.target.innerText) {
         case "AC":
            display.innerText = "";
            break;
         case "←":
            if (display.innerText) {
               display.innerText = display.innerText.slice(0, -1);
            }
            break;
         case "=":
            try {
               let n = eval(display.innerText);
               n = parseFloat(n);
               display.innerText = n.toLocaleString("en");
            } catch {
               display.innerText = "Err!";
            }
            break;
         default:
            display.innerText += e.target.innerText;
      }
   });
});
