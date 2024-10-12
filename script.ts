// Get form elements
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const outputName = document.getElementById('outputName') as HTMLDivElement;
const outputEmail = document.getElementById('outputEmail') as HTMLDivElement;
const outputPhone = document.getElementById('outputPhone') as HTMLDivElement;
const outputSkills = document.getElementById('outputSkills') as HTMLUListElement;
const outputExperience = document.getElementById('outputExperience') as HTMLDivElement;

const shareableLinkInput = document.getElementById('shareableLink') as HTMLInputElement;
const copyLinkButton = document.getElementById('copyLink') as HTMLButtonElement;

// Listen for form submission
resumeForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

  // Update the resume output
  outputName.textContent = name;
  outputEmail.textContent = email;
  outputPhone.textContent = phone;

  // Clear existing skills
  outputSkills.innerHTML = '';
  const skillListItem = document.createElement('li');
  skillListItem.textContent = skills;
  outputSkills.appendChild(skillListItem);

  outputExperience.textContent = experience;

  // Generate shareable link
  const resumeData = {
    name,
    email,
    phone,
    skills,
    experience,
  };
  
  const encodedData = encodeURIComponent(JSON.stringify(resumeData));
  const shareableLink = `${window.location.origin}${window.location.pathname}?resume=${encodedData}`;
  shareableLinkInput.value = shareableLink;
});

// Copy link to clipboard
copyLinkButton.addEventListener('click', () => {
  shareableLinkInput.select();
  document.execCommand('copy');
  alert('Shareable link copied to clipboard!');
});

// Load resume from URL if available
window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  const resume = params.get('resume');
  
  if (resume) {
    const decodedData = JSON.parse(decodeURIComponent(resume));
    outputName.textContent = decodedData.name;
    outputEmail.textContent = decodedData.email;
    outputPhone.textContent = decodedData.phone;
    
    outputSkills.innerHTML = '';
    const skillListItem = document.createElement('li');
    skillListItem.textContent = decodedData.skills;
    outputSkills.appendChild(skillListItem);
    
    outputExperience.textContent = decodedData.experience;
  }
});
