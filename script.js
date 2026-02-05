// Mock database: Maps student IDs to names (expand as needed)
        const studentDatabase = {
            "25-0350": "Christopher I. Madamba",
            "25-0302": "Rose E. Cañeza",
            "25-0032": "Jewel Bryan F. Apostol",
            "25-0193": "Princess Angelique B. Bergonia",
            "25-0841": "Aldrin B. Dela Cruz",
            "25-0319": "Jush N. Ancheta",
            "25-0327": "Ellaisa Marie A. Ramos",
            "25-0460": "Melmar D. Ranque",
            "25-0461": "Jamil D. Bayabao",
            "25-0341": "Rhian T. Villanueva",
            "25-0947": "Aaron John Ezekiel B. Reyes",
            "25-0195": "Darlene M. Cabreros",
            "25-0292": "Edelyn F. Fernandez",
            "25-0332": "King Jb G. Cabasag",
            "25-0209": "Ivy C. Del Rosario",
            "25-0171": "Francis John A. Pinto",
            "25-0752": "Nika Joy V. Santos",
            "25-0310": "Mark Ruel N. Santiago",
            "25-0293": "Kezia E. Balubar",
            "25-0359": "Amelia Rose T. Julian",
            "25-0349": "Prince Jhon Olvidado",
            "25-0352": "Jeston Valdez",
            "25-0356": "Andrew Gaudan",
            "25-0751": "Reymond Estardo",
            "25-0807": "Roger J. Carpio Jr",
            "25-0158": "Jester D. Bumanglag",
            "25-0876": "Cesar D. Faustino",
            "25-0157": "Julian P. Bello",
            "25-0344": "May Ann O. Tadeo",
            "25-0842": "Paul Junarc B. Tayag",
            "25-0288": "Oyo Boy Z. Martinez",
            "25-0361": "Krisjay C. Portugal",
            "25-0330": "Erica Shaine U. Soto",
            "25-0337": "Maria Hezekiah Mae G. Still",
            "25-0320": "Aisha P. Viñas",
            "25-0321": "Jemica B. Arceo",
            "25-0182": "Darwin P. Magbual Jr.",
            "25-0761": "Mark Angelo V. Tolentino",
            "25-0226": "Jessa Latigay",
            "25-0194": "Alyssa Cacal",
            "25-0181": "Jaypee C. Santos",
            "25-0134": "Aironpol Buncag",
            "25-0927": "Ryan Jonrick Bautista",
            "25-0942": "Adrian L. Ramos",
        };

        // Elements
        const studentIdInput = document.getElementById('studentId');
        const addStudentBtn = document.getElementById('addStudent');
        const displayDate = document.getElementById('displayDate');
        const attendeeList = document.getElementById('attendeeList');

        // Function to update the attendance sheet (only date now)
        function updateSheet() {
            displayDate.textContent = new Date().toLocaleDateString(); // Current date
        }

        // Add student event
        function addStudent() {
    const id = studentIdInput.value.trim();
    if (!id) {
        alert('Please enter a student ID.');
        return;
    }
    if (!studentDatabase[id]) {
        alert('Student ID not found in database.');
        return;
    }

    const existing = Array.from(attendeeList.children)
        .some(tr => tr.dataset.id === id);

    if (existing) {
        alert('Student already added.');
        return;
    }

    const tr = document.createElement('tr');
    tr.dataset.id = id;
    tr.innerHTML = `
        <td>${studentDatabase[id]}</td>
        <td>${id}</td>
        <td>${new Date().toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })}</td>
    `;

    attendeeList.appendChild(tr);
    studentIdInput.value = '';
    updateSheet();
}
addStudentBtn.addEventListener('click', addStudent);

// Add student via Enter key (desktop + mobile)
studentIdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addStudent();
    }
});
        // Initial update
        updateSheet();
        const saveImageBtn = document.getElementById('saveImageBtn');

saveImageBtn.addEventListener('click', async () => {
    const sheet = document.getElementById('attendanceSheet');

    // save original viewport
    const originalWidth = document.body.style.width;

    // force desktop width
    document.body.style.width = '210mm';

    document.body.classList.add('print-mode');
    sheet.classList.add('print-mode');

    const canvas = await html2canvas(sheet, {
        scale: 3,
        backgroundColor: '#ffffff',
        windowWidth: sheet.scrollWidth
    });

    document.body.classList.remove('print-mode');
    sheet.classList.remove('print-mode');

    document.body.style.width = originalWidth;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 1.0);
    link.download = `BSIT_1C_Attendance_${new Date().toISOString().slice(0,10)}.png`;
    link.click();
});


    document.body.classList.remove('print-mode');
    sheet.classList.remove('print-mode');

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `BSIT_1C_Attendance_${new Date().toISOString().slice(0,10)}.png`;
    link.click();