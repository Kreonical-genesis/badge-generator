//import translations from '../locales/ru.json';

function initLanguageSwitcher() {
    const elements = {
        title: document.getElementById('app-title'),
        mainText: document.getElementById('text-main'),
        secondaryText: document.getElementById('text-secondary'),
        downloadBtn: document.getElementById('download-btn'),
        color1Btn: document.getElementById('color1-btn'),
        color2Btn: document.getElementById('color2-btn'),
        modal: document.getElementById('language-modal'),
        langBtn: document.getElementById('language-btn')
    };

    elements.langBtn.addEventListener('click', () => {
        elements.modal.style.display = 'flex';
    });

    elements.modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('language-option')) {
            updateTranslations(e.target.dataset.lang);
            elements.modal.style.display = 'none';
        }
        if (e.target === elements.modal) {
            elements.modal.style.display = 'none';
        }
    });

    function updateTranslations(lang) {
        // Здесь будет загрузка переводов из JSON-файла
        // Пока используем стандартные переводы
        elements.title.textContent = translations.title;
        elements.mainText.placeholder = translations.mainText;
        elements.secondaryText.placeholder = translations.secondaryText;
        elements.downloadBtn.textContent = translations.download;
        elements.color1Btn.textContent = translations.color1;
        elements.color2Btn.textContent = translations.color2;
    }
}
function initBadgeGenerator() {
    const badgePreview = document.getElementById('badge-preview');
    const icon = document.querySelector('.icon');
    const textPrimary = document.querySelector('.text-primary');
    const textSecondary = document.querySelector('.text-secondary');
    
    // Загрузка аватарки
    document.getElementById('avatar').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            icon.style.backgroundImage = `url(${event.target.result})`;
            icon.style.backgroundColor = 'transparent';
        };
        reader.readAsDataURL(file);
    });
    
    // Смена стиля баджа
    document.getElementById('badge-style').addEventListener('change', function(e) {
        badgePreview.className = 'badge';
        badgePreview.classList.add(e.target.value);
    });
    
    // Обновление текста
    document.getElementById('text-main').addEventListener('input', function(e) {
        textPrimary.textContent = e.target.value || "Requires";
    });
    
    document.getElementById('text-secondary').addEventListener('input', function(e) {
        textSecondary.textContent = e.target.value || "Kreo_gen";
    });
    
    // Скачивание баджа
    document.getElementById('download-btn').addEventListener('click', function() {
        html2canvas(badgePreview, {
            backgroundColor: null,
            scale: 2
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'minecraft-badge.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
}
function initColorPickers() {
    let gradientColors = ['#8bffa8', '#6bffc9'];
    let textColors = {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.9)'
    };
    
    const pickr1 = Pickr.create({
        el: '#color1-btn',
        theme: 'classic',
        default: gradientColors[0],
        components: {
            preview: true,
            opacity: false,
            hue: true,
            interaction: {
                input: true,
                save: true
            }
        }
    });
    
    const pickr2 = Pickr.create({
        el: '#color2-btn',
        theme: 'classic',
        default: gradientColors[1],
        components: {
            preview: true,
            opacity: false,
            hue: true,
            interaction: {
                input: true,
                save: true
            }
        }
    });
    
    const textPickrPrimary = Pickr.create({
        el: '[data-target="primary"].color-picker-text',
        theme: 'classic',
        default: textColors.primary,
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                input: true,
                save: true
            }
        }
    });
    
    const textPickrSecondary = Pickr.create({
        el: '[data-target="secondary"].color-picker-text',
        theme: 'classic',
        default: textColors.secondary,
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                input: true,
                save: true
            }
        }
    });
    
    pickr1.on('save', (color) => {
        gradientColors[0] = color.toHEXA().toString();
        updateGradient();
    });
    
    pickr2.on('save', (color) => {
        gradientColors[1] = color.toHEXA().toString();
        updateGradient();
    });
    
    textPickrPrimary.on('save', (color) => {
        textColors.primary = color.toHEXA().toString();
        document.querySelector('.text-primary').style.color = textColors.primary;
    });
    
    textPickrSecondary.on('save', (color) => {
        textColors.secondary = color.toHEXA().toString();
        document.querySelector('.text-secondary').style.color = textColors.secondary;
    });
    
    function updateGradient() {
        document.getElementById('badge-preview').style.background = 
            `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`;
    }
}
document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.dataset.target;
        const textElement = document.querySelector(`.text-${target}`);
        const formatType = this.classList.contains('bold') ? 'bold' : 'italic';
        
        if (formatType === 'bold') {
            const isBold = textElement.style.fontWeight === 'bold';
            textElement.style.fontWeight = isBold ? 'normal' : 'bold';
            this.classList.toggle('active', !isBold);
        } else {
            const isItalic = textElement.style.fontStyle === 'italic';
            textElement.style.fontStyle = isItalic ? 'normal' : 'italic';
            this.classList.toggle('active', !isItalic);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initBadgeGenerator();
    initColorPickers();
});