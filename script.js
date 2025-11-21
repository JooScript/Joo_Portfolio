function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

 fetch('./files/tools.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('tools-container');
      data.tools.forEach(tool => {
        container.innerHTML += `
      <span class="tool-tag">
        <img src="./imgs/checkmark.png" alt="${tool.name}" title="${tool.name}"/>
        ${tool.name}
      </span>
        `;
      });
    });