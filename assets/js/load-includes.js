// Load common header and footer
(function() {
    'use strict';
    
    // Function to get the correct base path for includes
    function getBasePath() {
        // All HTML files are in project/ directory, includes/ is also in project/
        // So relative path from HTML files to includes/ is just 'includes/'
        return 'includes/';
    }
    
    // Function to load HTML and insert into element
    function loadHTMLIntoElement(url, targetElement) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.text();
            })
            .then(html => {
                if (targetElement) {
                    targetElement.innerHTML = html;
                    // Re-initialize any scripts in the loaded content
                    const scripts = targetElement.getElementsByTagName('script');
                    for (let i = 0; i < scripts.length; i++) {
                        const newScript = document.createElement('script');
                        if (scripts[i].src) {
                            newScript.src = scripts[i].src;
                        } else {
                            newScript.textContent = scripts[i].textContent;
                        }
                        if (scripts[i].defer) newScript.defer = true;
                        if (scripts[i].async) newScript.async = true;
                        document.body.appendChild(newScript);
                        scripts[i].parentNode.removeChild(scripts[i]);
                    }
                }
            })
            .catch(error => {
                console.error('Error loading ' + url + ':', error);
                // Fallback: try with XMLHttpRequest if fetch fails
                loadWithXHR(url, targetElement);
            });
    }
    
    // Fallback function using XMLHttpRequest
    function loadWithXHR(url, targetElement) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) { // 0 for file:// protocol
                    if (targetElement) {
                        targetElement.innerHTML = xhr.responseText;
                        // Re-initialize any scripts in the loaded content
                        const scripts = targetElement.getElementsByTagName('script');
                        for (let i = 0; i < scripts.length; i++) {
                            const newScript = document.createElement('script');
                            if (scripts[i].src) {
                                newScript.src = scripts[i].src;
                            } else {
                                newScript.textContent = scripts[i].textContent;
                            }
                            if (scripts[i].defer) newScript.defer = true;
                            if (scripts[i].async) newScript.async = true;
                            document.body.appendChild(newScript);
                            scripts[i].parentNode.removeChild(scripts[i]);
                        }
                    }
                } else {
                    console.error('Error loading ' + url + ': ' + xhr.status);
                }
            }
        };
        xhr.send(null);
    }
    
    // Load header and footer when DOM is ready
    function loadIncludes() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        const basePath = getBasePath();
        
        console.log('Loading includes from:', basePath);
        
        if (headerPlaceholder) {
            console.log('Loading header...');
            loadHTMLIntoElement(basePath + 'header.html', headerPlaceholder)
                .then(() => console.log('Header loaded successfully'))
                .catch(err => console.error('Failed to load header:', err));
        } else {
            console.warn('Header placeholder not found');
        }
        
        if (footerPlaceholder) {
            console.log('Loading footer...');
            loadHTMLIntoElement(basePath + 'footer.html', footerPlaceholder)
                .then(() => console.log('Footer loaded successfully'))
                .catch(err => console.error('Failed to load footer:', err));
        } else {
            console.warn('Footer placeholder not found');
        }
    }
    
    // Run immediately since script is at end of body
    loadIncludes();
})();

