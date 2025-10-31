const APP = (() => {
  const CRITERIA = [
    { key: 'title', label: 'Title & Abstract', weight: 0.10 },
    { key: 'intro', label: 'Introduction (Objective & Research Problem)', weight: 0.15 },
    { key: 'lit', label: 'Literature Review', weight: 0.15 },
    { key: 'framework', label: 'Research Framework (Results & Analysis)', weight: 0.20 },
    { key: 'poster', label: 'Poster & Representation (Q&A)', weight: 0.15 },
    { key: 'teamwork', label: 'Teamwork & Collaboration', weight: 0.15 }
  ];

  const INITIAL_PROJECTS = [
    { name: 'Predicting Customer Churn Using Machine Learning Models', description: 'Section O51 - Group 1: Somaya Altif, Rowa Alhamidi, Jood Alqazlan, Bushra Almuqayrah' },
    { name: 'Automatic Phishing Email Classification', description: 'Section O51 - Group 2: Rana Alaskar, Lujain Alruwaili, Munira Almosaa, Rand Alzouman, Jumana Aljahni' },
    { name: 'Cybersecurity Threat Detection through Data Analysis', description: 'Section O51 - Group 3: Arej Thalab Albogami, Wafaa Sultan Alotaibi, Haneen Abdulrahman Alshwaiqi, Lujain Saad Alnatefi' },
    { name: 'Proactive Intrusion Detection for Smart Home IoT Devices', description: 'Section O51 - Group 4: Ajwan Alomar, Riyof Alghunaimi, Latifa Almuni, Jood Almuni, Amjad Alosaimi' },
    { name: 'Detection of Arabic Distress Sounds for a Voice-Activated Emergency Alarm System', description: 'Section O51 - Group 5: Shawq Alhosaini, Dana Alkhuraib, Rima Alarjani, Raghad Alqahtani' },
    { name: 'Artificial Intelligence in Education', description: 'Section O52 - Group 1: Khalood Alshmrani, Shahd Alyasin, Maya Alshahri, Dalia Almutairi, Fawz Almudr' },
    { name: 'UML vs MDE: Enhancing Agile Software Development', description: 'Section O52 - Group 2: Jood Alshahrani, Jadel Alsaeeri, Albandri Alsaedon, Ghada Altamyat' },
    { name: 'Hybrid and Adaptive Software Development Methodologies', description: 'Section O52 - Group 3: Shahd Alotaibi, Layan Faiz Ahmed, Layan Ababtain' },
    { name: 'AI in Healthcare', description: 'Section O52 - Group 4: Nouf Khaled Bin Hasan, Asil Alrasn, Ghaida Almghamis, Roda Alothman, Ghalia Albukheet' },
    { name: 'Enhancing IoT Security Using Honeypot Systems: Threat Detection and Analysis', description: 'Section O52 - Group 5: Rania Abdullah Farhan, Raghad Alsamih, Dana Alshahri, Shatha Alghamdi, Lamia Alotaibi' },
    { name: 'Hybrid Test Automation Framework for Agile Web Applications', description: 'Section O52 - Group 6: Amal Almutairi, Taif Alshahri, Shahd Almutairi' }
  ];

  const ratingsKey = (id) => `ratings_project${id}`;

  function loadRatings(id) {
    return JSON.parse(localStorage.getItem(ratingsKey(id)) || '[]');
  }

  function saveRatings(id, arr) {
    localStorage.setItem(ratingsKey(id), JSON.stringify(arr));
  }

  function addRating(projectId, evaluatorName, scores) {
    let total = 0;
    CRITERIA.forEach(c => total += (Number(scores[c.key]) || 0) * c.weight);
    total = Math.round(total * 100) / 100;
    const record = { evaluatorName, scores, total, createdAt: Date.now() };
    const arr = loadRatings(projectId);
    arr.unshift(record);
    saveRatings(projectId, arr);
    return record;
  }

  function aggregate(id) {
    const arr = loadRatings(id);
    const n = arr.length;
    const sums = {};
    CRITERIA.forEach(c => sums[c.key] = 0);
    let totalSum = 0;
    arr.forEach(r => {
      CRITERIA.forEach(c => sums[c.key] += Number(r.scores[c.key]) || 0);
      totalSum += r.total;
    });
    const averages = {};
    CRITERIA.forEach(c => averages[c.key] = n ? Math.round((sums[c.key]/n)*100)/100 : 0);
    const averageTotal = n ? Math.round((totalSum / n)*100)/100 : 0;
    return { count: n, averages, averageTotal, entries: arr };
  }

  return { CRITERIA, INITIAL_PROJECTS, addRating, aggregate, loadRatings };
})();
