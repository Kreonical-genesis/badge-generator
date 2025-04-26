function initBadgeGenerator() {
    const badgePreviewContainer = document.querySelector('.badge-preview-container');
    const badgePreview = document.getElementById('badge-preview');
    const exportAreaVisualizer = document.createElement('div');
    exportAreaVisualizer.id = 'export-area-visualizer';
    badgePreviewContainer.appendChild(exportAreaVisualizer);
    const showExportAreaCheckbox = document.getElementById('show-export-area');
    const exportWidthSlider = document.getElementById('export-width');
    const exportHeightSlider = document.getElementById('export-height');
    const exportWidthValueSpan = document.getElementById('export-width-value');
    const exportHeightValueSpan = document.getElementById('export-height-value');

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
    const zoomInIcon = document.getElementById('zoom-in-icon');
    const zoomOutIcon = document.getElementById('zoom-out-icon');
    const settingsCategories = document.querySelectorAll('.settings-category');
    const iconAutoHeightCheckbox = document.getElementById('icon-auto-height');
    const badgePreviewElement = document.getElementById('badge-preview');
    const autoHeightClasses = ['.cozy-minimal', '.cozy-ava', '.compact-minimal'];

    const badgeShadowOffsetXInput = document.getElementById('badge-shadow-offset-x');
    const badgeShadowOffsetYInput = document.getElementById('badge-shadow-offset-y');
    const badgeShadowBlurInput = document.getElementById('badge-shadow-blur');
    const badgeShadowSpreadInput = document.getElementById('badge-shadow-spread');
    const badgeShadowColorValueInput = document.getElementById('badge-shadow-color-value');
    const badgeShadowTypeSelect = document.getElementById('badge-shadow-type');

    const badgeBorderWidthInput = document.getElementById('badge-border-width');
    const badgeBorderStyleSelect = document.getElementById('badge-border-style');
    const badgeBorderColorValueInput = document.getElementById('badge-border-color-value');

    const highlightElement = (targetClass) => {
        badgePreview.querySelectorAll('*').forEach(el => el.classList.remove('highlight'));
        if (targetClass && badgePreview.querySelector(`.${targetClass}`)) {
            badgePreview.querySelector(`.${targetClass}`).classList.add('highlight');
        }
    };

    const updateBadgeAutoHeight = () => {
        autoHeightClasses.forEach(className => {
            const classList = badgePreviewElement.classList;
            if (classList.contains(className.substring(1))) {
                badgePreviewElement.style.height = iconAutoHeightCheckbox.checked ? 'auto' : '';
            }
        });
    };

    zoomSlider.addEventListener('input', function() {
        badgePreview.style.transform = `scale(${this.value})`;
        updateExportAreaVisualizer();

        const currentValue = parseFloat(this.value);
        const minValue = parseFloat(this.min);
        const maxValue = parseFloat(this.max);
        const range = maxValue - minValue;

        const normalizedValue = (currentValue - minValue) / range;

        const scaleFactor = 1;

        const zoomInScale = 1 + (normalizedValue * scaleFactor);
        zoomInIcon.style.transform = `scale(${zoomInScale})`;
        zoomInIcon.style.opacity = 0.6 + (normalizedValue * 0.4);

        const zoomOutScale = 1 + ((1 - normalizedValue) * scaleFactor);
        zoomOutIcon.style.transform = `scale(${zoomOutScale})`;
        zoomOutIcon.style.opacity = 0.6 + ((1 - normalizedValue) * 0.4);
    });
    

    zoomInIcon.addEventListener('click', () => {
        zoomSlider.value = Math.min(parseFloat(zoomSlider.value) + 0.1, zoomSlider.max);
        zoomSlider.dispatchEvent(new Event('input'));
    });

    zoomOutIcon.addEventListener('click', () => {
        zoomSlider.value = Math.max(parseFloat(zoomSlider.value) - 0.1, zoomSlider.min);
        zoomSlider.dispatchEvent(new Event('input'));
    });

    const updateBadgeStyle = () => {
        const boxShadowValue = `${badgeShadowOffsetXInput.value}px ${badgeShadowOffsetYInput.value}px ${badgeShadowBlurInput.value}px ${badgeShadowSpreadInput.value}px ${badgeShadowColorValueInput.value} ${badgeShadowTypeSelect.value}`;
        badgePreview.style.boxShadow = boxShadowValue;

        const borderWidthValue = `${badgeBorderWidthInput.value}px`;
        const borderStyleValue = badgeBorderStyleSelect.value;
        const borderColorValue = badgeBorderColorValueInput.value;
        badgePreview.style.border = `${borderWidthValue} ${borderStyleValue} ${borderColorValue}`;
        updateExportAreaVisualizer();
    };

    iconAutoHeightCheckbox.addEventListener('change', updateBadgeAutoHeight);

    badgeShadowOffsetXInput.addEventListener('input', updateBadgeStyle);
    badgeShadowOffsetYInput.addEventListener('input', updateBadgeStyle);
    badgeShadowBlurInput.addEventListener('input', updateBadgeStyle);
    badgeShadowSpreadInput.addEventListener('input', updateBadgeStyle);
    badgeShadowTypeSelect.addEventListener('change', updateBadgeStyle);

    badgeBorderWidthInput.addEventListener('input', updateBadgeStyle);
    badgeBorderStyleSelect.addEventListener('change', updateBadgeStyle);

    settingsCategories.forEach(category => {
        const categoryTitle = category.querySelector('.category-title');
        if (categoryTitle) {
            const categoryText = categoryTitle.textContent.toLowerCase().trim();
            let targetClass = null;

            switch (categoryText) {
                case 'icon':
                    targetClass = 'icon-container';
                    break;
                case 'text-primary':
                    targetClass = 'text-primary';
                    break;
                case 'text-secondary':
                    targetClass = 'text-secondary';
                    break;
            }

            category.addEventListener('mouseenter', () => {
                highlightElement(targetClass);
            });

            category.addEventListener('mouseleave', () => {
                highlightElement(null);
            });
        }
    });

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

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        loadImage(file);
    });

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

    const iconSizeInput = document.getElementById('icon-size');
    iconSizeInput.addEventListener('input', function() {
        iconElement.style.width = this.value + 'px';
        iconElement.style.height = this.value + 'px';
        updateExportAreaVisualizer();
    });

    const iconDropShadowCheckbox = document.getElementById('icon-drop-shadow');
    const iconDropShadowValueInput = document.getElementById('icon-drop-shadow-value');
    const updateIconDropShadow = () => {
        iconElement.style.filter = iconDropShadowCheckbox.checked ? `drop-shadow(${iconDropShadowValueInput.value})` : '';
        updateExportAreaVisualizer();
    };
    iconDropShadowCheckbox.addEventListener('change', updateIconDropShadow);
    iconDropShadowValueInput.addEventListener('input', updateIconDropShadow);

    iconBorderRadiusPercentInput.addEventListener('input', function() {
        iconElement.style.borderRadius = Math.max(0, Math.min(100, this.value)) + '%';
        updateExportAreaVisualizer();
    });

    const iconBoxShadowInput = document.getElementById('icon-box-shadow');
    iconBoxShadowInput.addEventListener('input', function() {
        iconElement.style.boxShadow = this.value;
        updateExportAreaVisualizer();
    });

    document.getElementById('badge-style').addEventListener('change', function(e) {
        badgePreview.className = 'badge';
        badgePreview.classList.add(e.target.value);
        const percent = Math.max(0, Math.min(100, badgeBorderRadiusPercentInput.value));
        const badgeWidth = badgePreview.offsetWidth;
        const badgeHeight = badgePreview.offsetHeight;
        const minDimension = Math.min(badgeWidth, badgeHeight);
        const borderRadiusPx = (percent / 100) * (minDimension / 2);
        badgePreview.style.borderRadius = borderRadiusPx + 'px';
        updateBadgeAutoHeight();
        updateExportAreaVisualizer();
    });

    document.getElementById('text-main').addEventListener('input', function(e) {
        textPrimary.textContent = e.target.value || "Requires";
        updateExportAreaVisualizer();
    });

    document.getElementById('text-secondary').addEventListener('input', function(e) {
        textSecondary.textContent = e.target.value || "Kreo_gen";
        updateExportAreaVisualizer();
    });

    badgeBorderRadiusPercentInput.addEventListener('input', function() {
        const percent = Math.max(0, Math.min(100, this.value));
        const badgeWidth = badgePreview.offsetWidth;
        const badgeHeight = badgePreview.offsetHeight;
        const minDimension = Math.min(badgeWidth, badgeHeight);
        const borderRadiusPx = (percent / 100) * (minDimension / 2);
        badgePreview.style.borderRadius = borderRadiusPx + 'px';
        updateExportAreaVisualizer();
    });

    document.getElementById('download-btn').addEventListener('click', function() {
        const badgeRect = badgePreview.getBoundingClientRect();
        const widthPercent = parseInt(exportWidthSlider.value, 10) / 100;
        const heightPercent = parseInt(exportHeightSlider.value, 10) / 100;

        const captureWidth = badgeRect.width * widthPercent;
        const captureHeight = badgeRect.height * heightPercent;
        const captureX = (badgeRect.width - captureWidth) / 2;
        const captureY = (badgeRect.height - captureHeight) / 2;

        html2canvas(badgePreview, {
            backgroundColor: null,
            width: captureWidth,
            height: captureHeight,
            x: captureX,
            y: captureY,
            scale: window.devicePixelRatio || 1,
            scrollX: 0,
            scrollY: 0
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'minecraft-badge.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    document.querySelectorAll('.category-title').forEach(title => {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('open');
            this.classList.toggle('open');
        });
    });

    const initialIconRadiusPercent = iconBorderRadiusPercentInput.value;
    iconElement.style.borderRadius = Math.max(0, Math.min(100, initialIconRadiusPercent)) + '%';

    const initialBadgeRadiusPercent = badgeBorderRadiusPercentInput.value;
    const initialBadgeWidth = badgePreview.offsetWidth;
    const initialBadgeHeight = badgePreview.offsetHeight;
    const initialMinBadgeDimension = Math.min(initialBadgeWidth, initialBadgeHeight);
    const initialBadgeRadiusPx = (initialBadgeRadiusPercent / 100) * (initialMinBadgeDimension / 2);
    badgePreview.style.borderRadius = initialBadgeRadiusPx + 'px';

    zoomSlider.addEventListener('input', function() {
        badgePreview.style.transform = `scale(${this.value})`;
        updateExportAreaVisualizer();
    });

    fontFamilyPrimaryInput.addEventListener('input', function() {
        textPrimary.style.fontFamily = this.value;
        updateExportAreaVisualizer();
    });

    fontFamilySecondaryInput.addEventListener('input', function() {
        textSecondary.style.fontFamily = this.value;
        updateExportAreaVisualizer();
    });

    exportWidthSlider.addEventListener('input', function() {
        exportWidthValueSpan.textContent = this.value + '%';
        updateExportAreaVisualizer();
    });

    exportHeightSlider.addEventListener('input', function() {
        exportHeightValueSpan.textContent = this.value + '%';
        updateExportAreaVisualizer();
    });

    showExportAreaCheckbox.addEventListener('change', function() {
        exportAreaVisualizer.style.display = this.checked ? 'block' : 'none';
    });

    function updateExportAreaVisualizer() {
        const badgeRect = badgePreview.getBoundingClientRect();
        const containerRect = badgePreviewContainer.getBoundingClientRect();

        const widthPercent = parseInt(exportWidthSlider.value, 10) / 100;
        const heightPercent = parseInt(exportHeightSlider.value, 10) / 100;

        const visualizerWidth = badgeRect.width * widthPercent;
        const visualizerHeight = badgeRect.height * heightPercent;
        const visualizerX = (badgeRect.left - containerRect.left) + (badgeRect.width - visualizerWidth) / 2;
        const visualizerY = (badgeRect.top - containerRect.top) + (badgeRect.height - visualizerHeight) / 2;

        exportAreaVisualizer.style.width = `${visualizerWidth}px`;
        exportAreaVisualizer.style.height = `${visualizerHeight}px`;
        exportAreaVisualizer.style.left = `${visualizerX}px`;
        exportAreaVisualizer.style.top = `${visualizerY}px`;
    }

    iconElement.style.backgroundImage = `url('assets/img/test-image.png')`;
    iconElement.style.backgroundColor = 'transparent';

    updateBadgeStyle();
    updateBadgeAutoHeight();
    updateExportAreaVisualizer();
}

function initColorPickers() {
    let gradientColors = ['#4CAF50', '#0c4b1f'];
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

    const badgeShadowColorPicker = Pickr.create({
        el: '#badge-shadow-color-btn',
        theme: 'classic',
        default: document.getElementById('badge-shadow-color-value').value,
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

    const badgeBorderColorPicker = Pickr.create({
        el: '#badge-border-color-btn',
        theme: 'classic',
        default: document.getElementById('badge-border-color-value').value,
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

    badgeShadowColorPicker.on('save', (color) => {
        const rgbaString = color.toRGBA().toString();
        document.getElementById('badge-shadow-color-value').value = rgbaString;
        document.getElementById('badge-shadow-color-btn').style.backgroundColor = rgbaString;
        document.getElementById('badge-shadow-color-btn').style.color = getContrastYIQ(rgbaString);
        const updateBadgeStyle = () => {
            const boxShadowValue = `${document.getElementById('badge-shadow-offset-x').value}px ${document.getElementById('badge-shadow-offset-y').value}px ${document.getElementById('badge-shadow-blur').value}px ${document.getElementById('badge-shadow-spread').value}px ${document.getElementById('badge-shadow-color-value').value} ${document.getElementById('badge-shadow-type').value}`;
            document.getElementById('badge-preview').style.boxShadow = boxShadowValue;

            const borderWidthValue = `${document.getElementById('badge-border-width').value}px`;
            const borderStyleValue = document.getElementById('badge-border-style').value;
            const borderColorValue = document.getElementById('badge-border-color-value').value;
            document.getElementById('badge-preview').style.border = `${borderWidthValue} ${borderStyleValue} ${borderColorValue}`;
            updateExportAreaVisualizer();
        };
        updateBadgeStyle();
    });

    badgeBorderColorPicker.on('save', (color) => {
        const rgbaString = color.toRGBA().toString();
        document.getElementById('badge-border-color-value').value = rgbaString;
        document.getElementById('badge-border-color-btn').style.backgroundColor = rgbaString;
        document.getElementById('badge-border-color-btn').style.color = getContrastYIQ(rgbaString);
        const updateBadgeStyle = () => {
            const boxShadowValue = `${document.getElementById('badge-shadow-offset-x').value}px ${document.getElementById('badge-shadow-offset-y').value}px ${document.getElementById('badge-shadow-blur').value}px ${document.getElementById('badge-shadow-spread').value}px ${document.getElementById('badge-shadow-color-value').value} ${document.getElementById('badge-shadow-type').value}`;
            document.getElementById('badge-preview').style.boxShadow = boxShadowValue;

            const borderWidthValue = `${document.getElementById('badge-border-width').value}px`;
            const borderStyleValue = document.getElementById('badge-border-style').value;
            const borderColorValue = document.getElementById('badge-border-color-value').value;
            document.getElementById('badge-preview').style.border = `${borderWidthValue} ${borderStyleValue} ${borderColorValue}`;
            updateExportAreaVisualizer();
        };
        updateBadgeStyle();
    });

    function updateGradient() {
        document.getElementById('badge-preview').style.background =
            `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`;
        updateExportAreaVisualizer();
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
                updateExportAreaVisualizer();
            } else if (isPercentInput && targetElement && property === 'borderRadius' && targetElement.classList.contains('icon')) {
                targetElement.style[property] = currentValue + '%';
                updateExportAreaVisualizer();
            } else if (targetElement && property && property === 'width') {
                targetElement.style.width = currentValue + 'px';
                targetElement.style.height = currentValue + 'px';
                updateExportAreaVisualizer();
            } else if (!isPercentInput && targetElement && (property === 'width' || property === null) && input.id.includes('shadow')) {
            } else if (!isPercentInput && targetElement && property === null && input.id.includes('border-width')) {
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
        updateExportAreaVisualizer();
    });
});

function getContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0,2),16);
    const g = parseInt(hexcolor.substr(2,2),16);
    const b = parseInt(hexcolor.substr(4,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

document.addEventListener('DOMContentLoaded', () => {
    initBadgeGenerator();
    initColorPickers();
    initInteractiveNumberInputs();
});