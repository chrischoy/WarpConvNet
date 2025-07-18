// Initialize Mermaid diagrams
let mermaidInitialized = false;

function initializeMermaid() {
    console.log('🚀 Initializing Mermaid...');
    console.log('🔍 Checking if mermaid is available:', typeof mermaid !== 'undefined');
    
    if (typeof mermaid === 'undefined') {
        console.error('❌ Mermaid library not loaded!');
        return;
    }
    
    if (!mermaidInitialized) {
        console.log('⚙️ Configuring mermaid...');
        // Configure mermaid
        mermaid.initialize({
            theme: 'default',
            themeVariables: {
                primaryColor: '#4CAF50',
                primaryTextColor: '#fff',
                primaryBorderColor: '#4CAF50',
                lineColor: '#4CAF50',
                secondaryColor: '#f8f9fa',
                tertiaryColor: '#fff'
            },
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });
        console.log('✅ Mermaid configured successfully');
        mermaidInitialized = true;
    }
}

function processMermaidBlocks() {
    console.log('🔍 Processing mermaid blocks...');
    
    // Find all code blocks that contain mermaid content
    const codeBlocks = document.querySelectorAll('pre code');
    console.log('🔍 Found', codeBlocks.length, 'code blocks');
    
    let mermaidBlocksFound = 0;
    codeBlocks.forEach(function(block, index) {
        const content = block.textContent.trim();
        console.log(`📝 Code block ${index + 1}:`, content.substring(0, 50) + '...');
        
        if (content.startsWith('graph ') || content.startsWith('flowchart ') || 
            content.startsWith('sequenceDiagram') || content.startsWith('classDiagram') ||
            content.startsWith('stateDiagram') || content.startsWith('erDiagram') ||
            content.startsWith('journey') || content.startsWith('gantt') ||
            content.startsWith('pie') || content.startsWith('quadrantChart') ||
            content.startsWith('xyChart') || content.startsWith('timeline') ||
            content.startsWith('zenuml') || content.startsWith('sankey')) {
            
            console.log('🎯 Found mermaid block:', content.substring(0, 30));
            mermaidBlocksFound++;
            
            // Create mermaid container
            const container = document.createElement('div');
            container.className = 'mermaid';
            container.textContent = content;
            
            console.log('🔄 Replacing code block with mermaid container');
            // Replace the code block with the mermaid container
            const preElement = block.parentNode;
            preElement.parentNode.replaceChild(container, preElement);
        }
    });
    
    console.log('📊 Total mermaid blocks found and converted:', mermaidBlocksFound);
    return mermaidBlocksFound;
}

function renderMermaidDiagrams() {
    console.log('🎨 Rendering mermaid diagrams...');
    try {
        const mermaidElements = document.querySelectorAll('.mermaid');
        console.log('🔍 Found', mermaidElements.length, 'mermaid elements to render');
        
        if (mermaidElements.length > 0) {
            mermaid.init(undefined, mermaidElements);
            console.log('✅ Mermaid diagrams rendered successfully');
        } else {
            console.log('⚠️ No mermaid elements found in DOM');
        }
    } catch (error) {
        console.error('❌ Error rendering mermaid diagrams:', error);
        console.error('❌ Error details:', error.message, error.stack);
    }
}

function processAndRenderMermaid() {
    initializeMermaid();
    const blocksFound = processMermaidBlocks();
    
    if (blocksFound > 0) {
        // Use a small delay to ensure DOM is ready
        setTimeout(renderMermaidDiagrams, 50);
    } else {
        console.log('⚠️ No mermaid blocks found to render');
    }
}

// Handle initial page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Content Loaded - processing mermaid');
    processAndRenderMermaid();
});

// Handle MkDocs navigation (for single-page app behavior)
document.addEventListener('DOMContentLoaded', function() {
    // Watch for navigation changes in MkDocs
    const observer = new MutationObserver(function(mutations) {
        let shouldProcess = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if new content was added
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.nodeType === 1 && (node.classList.contains('md-content') || 
                        node.querySelector && node.querySelector('pre code'))) {
                        shouldProcess = true;
                        break;
                    }
                }
            }
        });
        
        if (shouldProcess) {
            console.log('🔄 Content changed - reprocessing mermaid');
            setTimeout(processAndRenderMermaid, 100);
        }
    });
    
    // Start observing the main content area
    const contentArea = document.querySelector('.md-content') || document.querySelector('main') || document.body;
    if (contentArea) {
        observer.observe(contentArea, {
            childList: true,
            subtree: true
        });
        console.log('👀 Started observing content changes for mermaid processing');
    }
});

// Fallback: also process on window load
window.addEventListener('load', function() {
    console.log('🌐 Window loaded - final mermaid check');
    setTimeout(processAndRenderMermaid, 200);
}); 