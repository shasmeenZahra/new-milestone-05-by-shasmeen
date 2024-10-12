// Get form elements
var resumeForm = document.getElementById('resumeForm');
var outputName = document.getElementById('outputName');
var outputEmail = document.getElementById('outputEmail');
var outputPhone = document.getElementById('outputPhone');
var outputSkills = document.getElementById('outputSkills');
var outputExperience = document.getElementById('outputExperience');
var shareableLinkInput = document.getElementById('shareableLink');
var copyLinkButton = document.getElementById('copyLink');
// Listen for form submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    // Update the resume output
    outputName.textContent = name;
    outputEmail.textContent = email;
    outputPhone.textContent = phone;
    // Clear existing skills
    outputSkills.innerHTML = '';
    var skillListItem = document.createElement('li');
    skillListItem.textContent = skills;
    outputSkills.appendChild(skillListItem);
    outputExperience.textContent = experience;
    // Generate shareable link
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        skills: skills,
        experience: experience,
    };
    var encodedData = encodeURIComponent(JSON.stringify(resumeData));
    var shareableLink = "".concat(window.location.origin).concat(window.location.pathname, "?resume=").concat(encodedData);
    shareableLinkInput.value = shareableLink;
});
// Copy link to clipboard
copyLinkButton.addEventListener('click', function () {
    shareableLinkInput.select();
    document.execCommand('copy');
    alert('Shareable link copied to clipboard!');
});
// Load resume from URL if available
window.addEventListener('load', function () {
    var params = new URLSearchParams(window.location.search);
    var resume = params.get('resume');
    if (resume) {
        var decodedData = JSON.parse(decodeURIComponent(resume));
        outputName.textContent = decodedData.name;
        outputEmail.textContent = decodedData.email;
        outputPhone.textContent = decodedData.phone;
        outputSkills.innerHTML = '';
        var skillListItem = document.createElement('li');
        skillListItem.textContent = decodedData.skills;
        outputSkills.appendChild(skillListItem);
        outputExperience.textContent = decodedData.experience;
    }
});
