// Initialize Mermaid diagrams
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Mermaid init script loaded!');
    console.log('🔍 Checking if mermaid is available:', typeof mermaid !== 'undefined');
    
    if (typeof mermaid === 'undefined') {
        console.error('❌ Mermaid library not loaded!');
        return;
    }
    
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
    
    if (mermaidBlocksFound > 0) {
        console.log('🎨 Rendering mermaid diagrams...');
        // Render all mermaid diagrams
        try {
            mermaid.init();
            console.log('✅ Mermaid diagrams rendered successfully');
        } catch (error) {
            console.error('❌ Error rendering mermaid diagrams:', error);
        }
    } else {
        console.log('⚠️ No mermaid blocks found to render');
    }
});

// Also handle dynamic content loading (for MkDocs live reload)
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for any dynamic content to load
    setTimeout(function() {
        const mermaidDivs = document.querySelectorAll('.mermaid');
        if (mermaidDivs.length > 0) {
            mermaid.init();
        }
    }, 100);
}); 