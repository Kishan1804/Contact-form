// Utilities
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

// Contact Validation
const form = qs('#contact-form');
console.log(form);

if (form) {
    const first_nameEl = qs('#first-name');
    const last_nameEl = qs('#last-name');
    const emailEl = qs('#email');
    const query_typeEl = qsa('#query-type');
    const messageEl = qs('#message');
    const checkboxEl = qs('#checkbox');
    const statusEl = qs('#form-status');

    const showError = (id,msg,danger) => {
        const el = qs(`#error-${id}`);
        const borderEl = qs(`#${id}`);
        if (el) {
            el.textContent = msg || '';
            borderEl.style.border = `1px solid var(${danger})`;
        };
    };

    const showCheckboxerror = (id,msg) => {
        const el = qs(`#error-${id}`);
        if (el) {
            el.textContent = msg || '';
        };
    };

    const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let ok = true;
        // First Name
        if(!first_nameEl.value.trim()){
            showError('first-name','This field is required','--red');
            ok = false;
        }else{
            showError('first-name','','--grey500');
        }
        // Last Name
        if(!last_nameEl.value.trim()){
            showError('last-name','This field is required','--red');
            ok = false;
        }else{
            showError('last-name','','--grey500');
        }
        // Email
        if(!emailEl.value.trim()){
            showError('email','This field is required','--red');
            ok = false;
        }else if(!isEmailValid(emailEl.value)){
            showError('email','Please enter a valid email address','--red');
        }else{
            showError('email','','--grey500');
        }
        // Query Type
        let isQuerySelected = false;
        for (const el of query_typeEl){
            if(el.checked) {
                isQuerySelected = true;
                break;
            }
        }
        if (!isQuerySelected) {
            showError('query-type','Please select a query type','--grey500');
            ok = false;
        }else{
            showError('query-type','','--grey500')
        }
        // Message
        if(!messageEl.value.trim()){
            showError('message','This field is required','--red');
            ok = false;
        }else{
            showError('message','','--grey500');
        }
        // Checkbox
        if(!checkboxEl.checked) {
            showCheckboxerror('checkbox','To submit this form, please consent to being contacted');
            ok = false;
        }else{
            showCheckboxerror('checkbox','');
        }

        if (!ok) return;

        if (ok) {
            statusEl.classList.add('visible');
            setTimeout(() => {
                statusEl.classList.remove('visible')
            },3000);

            form.reset();
        }    
    })
}