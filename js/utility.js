let cookieCount = 0;
    let totalSatisfaction = 0;
    let lastSatisfaction = 0;
    const maxCookies = 10;

    const cookie = document.getElementById('cookie');
    const cookieCountDisplay = document.getElementById('cookie-count');
    const totalSatisfactionDisplay = document.getElementById('total-satisfaction');
    const marginalSatisfactionDisplay = document.getElementById('marginal-satisfaction');
    const satisfactionFill = document.getElementById('satisfaction-fill');
    const message = document.getElementById('message');
    const graph = document.getElementById('graph');
    const resetButton = document.getElementById('reset');

    function calculateSatisfaction(cookieNumber) {
      return Math.max(0, Math.floor(100 * Math.pow(0.8, cookieNumber)));
    }

    function updateGraph() {
      graph.innerHTML = '';
      for (let i = 0; i <= cookieCount; i++) {
        const satisfaction = calculateSatisfaction(i);
        const x = (i / maxCookies) * 100;
        const y = (satisfaction / 100) * 100;
        
        const point = document.createElement('div');
        point.className = 'graph-point';
        point.style.left = x + '%';
        point.style.bottom = y + '%';
        graph.appendChild(point);
      }
    }

    function updateDisplay() {
      cookieCountDisplay.textContent = cookieCount;
      totalSatisfactionDisplay.textContent = totalSatisfaction;
      marginalSatisfactionDisplay.textContent = lastSatisfaction;
      satisfactionFill.style.width = (totalSatisfaction / (100 * 3)) + '%';
      
      // Satisfaction color change based on levels
      if (lastSatisfaction >= 50) {
        satisfactionFill.style.backgroundColor = '#28a745'; // green
      } else if (lastSatisfaction >= 20) {
        satisfactionFill.style.backgroundColor = '#ffc107'; // yellow
      } else {
        satisfactionFill.style.backgroundColor = '#dc3545'; // red
      }
      
      if (cookieCount >= maxCookies) {
        cookie.style.opacity = '0.5';
        message.textContent = "You're too full for any more cookies!";
      }
    }

    function eatCookie() {
      if (cookieCount >= maxCookies) return;
      
      cookieCount++;
      lastSatisfaction = calculateSatisfaction(cookieCount - 1);
      totalSatisfaction += lastSatisfaction;
      
      updateDisplay();
      updateGraph();
      
      if (lastSatisfaction > 70) {
        message.textContent = "Mmm, delicious! That was really satisfying!";
      } else if (lastSatisfaction > 40) {
        message.textContent = "Still pretty good, but not as amazing as the first one.";
      } else if (lastSatisfaction > 20) {
        message.textContent = "Starting to get full... satisfaction is declining.";
      } else {
        message.textContent = "These are losing their charm...";
      }
    }

    function reset() {
      cookieCount = 0;
      totalSatisfaction = 0;
      lastSatisfaction = 0;
      cookie.style.opacity = '1';
      message.textContent = "How satisfied will you be with each cookie?";
      updateDisplay();
      updateGraph();
    }

    cookie.addEventListener('click', eatCookie);
    resetButton.addEventListener('click', reset);

    updateGraph();