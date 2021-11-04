// API INTERSECTION OBSERVER para permitir detectar que section esta visible en el viewport

//Query//
const sections = document.querySelectorAll('section');
const sectionBtn = document.querySelectorAll('.section__btn');
const navBtn = document.querySelectorAll('.navbutton');

// Funciones //
const activeSectionHandler = (currentSectionId) => {
    sectionBtn.forEach(section => {
        if (section.dataset.section == currentSectionId) {
            section.classList.add('active');
            return;
        }
        section.classList.remove('active');
    })

    navBtn.forEach(btn => {
        if (btn.dataset.section == currentSectionId) {
            btn.classList.add('active');
            return;
        }
        btn.classList.remove('active');
    })
}

// view //
const SWCallback = (section, sectionWatcher) => {
    section.forEach(section => {
        if (!section.isIntersecting) {
            return
        } else {
            activeSectionHandler(section.target.id);
        }
    })
}

const SWOptions = {
    threshold: .6
}

const sectionWatcher = new IntersectionObserver(SWCallback, SWOptions);

sections.forEach(section => {
    sectionWatcher.observe(section);
})
