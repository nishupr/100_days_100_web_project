const cryptoData = [
  {
    name: 'Bitcoin',
    price: '$64,200',
    change: '+5.3%',
    cap: '$1.2T'
  },
  {
    name: 'Ethereum',
    price: '$3,450',
    change: '+2.1%',
    cap: '$450B'
  },
  {
    name: 'Solana',
    price: '$182',
    change: '-1.4%',
    cap: '$81B'
  }
];

const table = document.getElementById('cryptoTable');

cryptoData.forEach((coin) => {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${coin.name}</td>
    <td>${coin.price}</td>
    <td class="${coin.change.includes('+') ? 'positive' : 'negative'}">
      ${coin.change}
    </td>
    <td>${coin.cap}</td>
  `;

  table.appendChild(row);
});

function animateValue(id, start, end, duration, suffix = '') {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));

  const obj = document.getElementById(id);

  const timer = setInterval(() => {
    current += increment;
    obj.textContent = current + suffix;

    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

animateValue('users', 0, 120, 1500, 'K+');
animateValue('volume', 0, 950, 1800, 'M');

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  section.scrollIntoView({
    behavior: 'smooth'
  });
}

function subscribeUser() {
  const email = document.getElementById('email').value;

  if(email === '') {
    alert('Please enter your email');
    return;
  }

  const toast = document.getElementById('toast');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);

  document.getElementById('email').value = '';
}

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});
