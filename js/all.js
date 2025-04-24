function initBadgeGenerator() {
    const badgePreviewContainer = document.querySelector('.badge-preview-container');
    const badgePreview = document.getElementById('badge-preview');
    const iconElement = document.querySelector('.icon');
    const textPrimary = document.querySelector('.text-primary');
    const textSecondary = document.querySelector('.text-secondary');
    const avatarInput = document.getElementById('avatar');
    const uploadContainer = document.querySelector('.upload-container');
    const iconBorderRadiusPercentInput = document.getElementById('icon-border-radius-percent');
    const badgeBorderRadiusPercentInput = document.getElementById('badge-border-radius-percent');
    const fontFamilyPrimaryInput = document.getElementById('font-family-primary');
    const fontFamilySecondaryInput = document.getElementById('font-family-secondary');
    const zoomSlider = document.getElementById('zoom-slider');

    const loadImage = (file) => {
        if (!file || !file.type.startsWith('image/')) {
            alert('Пожалуйста, загрузите файл изображения.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            iconElement.style.backgroundImage = `url(${event.target.result})`;
            iconElement.style.backgroundColor = 'transparent';
        };
        reader.readAsDataURL(file);
    };

    // Загрузка через кнопку выбора файла
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        loadImage(file);
    });

    // Перетаскивание файла
    uploadContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadContainer.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });

    uploadContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        loadImage(file);
    });

    // Настройки иконки
    const iconSizeInput = document.getElementById('icon-size');
    iconSizeInput.addEventListener('input', function() {
        iconElement.style.width = this.value + 'px';
        iconElement.style.height = this.value + 'px';
    });

    const iconDropShadowCheckbox = document.getElementById('icon-drop-shadow');
    const iconDropShadowValueInput = document.getElementById('icon-drop-shadow-value');
    const updateIconDropShadow = () => {
        iconElement.style.filter = iconDropShadowCheckbox.checked ? `drop-shadow(${iconDropShadowValueInput.value})` : '';
    };
    iconDropShadowCheckbox.addEventListener('change', updateIconDropShadow);
    iconDropShadowValueInput.addEventListener('input', updateIconDropShadow);

    iconBorderRadiusPercentInput.addEventListener('input', function() {
        iconElement.style.borderRadius = Math.max(0, Math.min(100, this.value)) + '%';
    });

    const iconBoxShadowInput = document.getElementById('icon-box-shadow');
    iconBoxShadowInput.addEventListener('input', function() {
        iconElement.style.boxShadow = this.value;
    });

    // Смена стиля баджа
    document.getElementById('badge-style').addEventListener('change', function(e) {
        badgePreview.className = 'badge';
        badgePreview.classList.add(e.target.value);
        // При смене стиля нужно обновить скругление значка
        const percent = Math.max(0, Math.min(100, badgeBorderRadiusPercentInput.value));
        const badgeWidth = badgePreview.offsetWidth;
        const badgeHeight = badgePreview.offsetHeight;
        const minDimension = Math.min(badgeWidth, badgeHeight);
        const borderRadiusPx = (percent / 100) * (minDimension / 2);
        badgePreview.style.borderRadius = borderRadiusPx + 'px';
    });

    // Обновление текста
    document.getElementById('text-main').addEventListener('input', function(e) {
        textPrimary.textContent = e.target.value || "Requires";
    });

    document.getElementById('text-secondary').addEventListener('input', function(e) {
        textSecondary.textContent = e.target.value || "Kreo_gen";
    });

    // Настройки значка (badge-preview)
    badgeBorderRadiusPercentInput.addEventListener('input', function() {
        const percent = Math.max(0, Math.min(100, this.value));
        const badgeWidth = badgePreview.offsetWidth;
        const badgeHeight = badgePreview.offsetHeight;
        const minDimension = Math.min(badgeWidth, badgeHeight);
        const borderRadiusPx = (percent / 100) * (minDimension / 2);
        badgePreview.style.borderRadius = borderRadiusPx + 'px';
    });

    const badgeBoxShadowInput = document.getElementById('badge-box-shadow');
    badgeBoxShadowInput.addEventListener('input', function() {
        badgePreview.style.boxShadow = this.value;
    });

    const badgeBorderInput = document.getElementById('badge-border');
    badgeBorderInput.addEventListener('input', function() {
        badgePreview.style.border = this.value;
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

    // Сворачивание/разворачивание категорий
    document.querySelectorAll('.category-title').forEach(title => {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('open');
            this.classList.toggle('open');
        });
    });

    // Инициализация начального состояния скругления при загрузке страницы
    const initialIconRadiusPercent = iconBorderRadiusPercentInput.value;
    iconElement.style.borderRadius = Math.max(0, Math.min(100, initialIconRadiusPercent)) + '%';

    const initialBadgeRadiusPercent = badgeBorderRadiusPercentInput.value;
    const initialBadgeWidth = badgePreview.offsetWidth;
    const initialBadgeHeight = badgePreview.offsetHeight;
    const initialMinBadgeDimension = Math.min(initialBadgeWidth, initialBadgeHeight);
    const initialBadgeRadiusPx = (initialBadgeRadiusPercent / 100) * (initialMinBadgeDimension / 2);
    badgePreview.style.borderRadius = initialBadgeRadiusPx + 'px';

    // Настройка масштабирования
    zoomSlider.addEventListener('input', function() {
        badgePreview.style.transform = `scale(${this.value})`;
    });

    // Настройка шрифтов
    fontFamilyPrimaryInput.addEventListener('input', function() {
        textPrimary.style.fontFamily = this.value;
    });

    fontFamilySecondaryInput.addEventListener('input', function() {
        textSecondary.style.fontFamily = this.value;
    });
}

function initColorPickers() {
    let gradientColors = ['#4CAF50', '#45a049'];
    let textColors = {
        primary: '#d4d4d4',
        secondary: 'rgba(212, 212, 212, 0.8)'
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

function initInteractiveNumberInputs() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        let isDragging = false;
        let startX = 0;
        let startValue = 0;
        const isPercentInput = input.id.includes('percent');
        const targetElement = input.id.includes('icon') ? document.querySelector('.icon') : document.getElementById('badge-preview');
        const property = input.id.includes('radius') ? 'borderRadius' : (input.id.includes('size') ? 'width' : null);
        const minValue = parseInt(input.getAttribute('min')) || 0;
        const maxValue = parseInt(input.getAttribute('max')) || 100;

        input.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startValue = parseInt(input.value, 10) || minValue;
            input.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const sensitivity = 0.5;
            let newValue = startValue + Math.round(deltaX * sensitivity);

            newValue = Math.max(minValue, Math.min(maxValue, newValue));
            input.value = newValue;
            input.dispatchEvent(new Event('input'));
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            input.style.userSelect = '';
        });

        input.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        input.addEventListener('wheel', function(e) {
            this.blur();
        });

        input.addEventListener('input', function() {
            let currentValue = parseInt(this.value, 10) || minValue;
            if (currentValue < minValue) {
                this.value = minValue;
                currentValue = minValue;
            } else if (currentValue > maxValue) {
                this.value = maxValue;
                currentValue = maxValue;
            }

            if (isPercentInput && targetElement && property === 'borderRadius' && targetElement.id === 'badge-preview') {
                const percent = currentValue;
                const badgeWidth = targetElement.offsetWidth;
                const badgeHeight = targetElement.offsetHeight;
                const minDimension = Math.min(badgeWidth, badgeHeight);
                const borderRadiusPx = (percent / 100) * (minDimension / 2);
                targetElement.style[property] = borderRadiusPx + 'px';
            } else if (isPercentInput && targetElement && property === 'borderRadius' && targetElement.classList.contains('icon')) {
                targetElement.style[property] = currentValue + '%';
            } else if (targetElement && property && property === 'width') {
                targetElement.style.width = currentValue + 'px';
                targetElement.style.height = currentValue + 'px';
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp') {
                let currentValue = parseInt(this.value, 10) || minValue;
                if (currentValue < maxValue) {
                    this.value = currentValue + 1;
                    this.dispatchEvent(new Event('input'));
                }
            } else if (e.key === 'ArrowDown') {
                let currentValue = parseInt(this.value, 10) || minValue;
                if (currentValue > minValue) {
                    this.value = currentValue - 1;
                    this.dispatchEvent(new Event('input'));
                }
            }
        });
    });
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
    initBadgeGenerator();
    initColorPickers();
    initInteractiveNumberInputs();
});