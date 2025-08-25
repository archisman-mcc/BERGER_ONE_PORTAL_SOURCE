// Helper utilities for applying select styles consistently across the application

import { selectStyles, statusSelectStyles, compactSelectStyles } from '../styles/select-styles';

/**
 * Get the appropriate select styles based on the component type
 * @param type - The type of select component
 * @returns The appropriate styles object
 */
export const getSelectStyles = (type: 'default' | 'status' | 'compact' = 'default') => {
    switch (type) {
        case 'status':
            return statusSelectStyles;
        case 'compact':
            return compactSelectStyles;
        default:
            return selectStyles;
    }
};

/**
 * Check if a component already has custom styles that should be migrated
 * @param componentCode - The component code as a string
 * @returns Object with migration information
 */
export const analyzeSelectComponent = (componentCode: string) => {
    const hasCustomStyles = /styles\s*=\s*\{[^}]*\}/.test(componentCode);
    const hasSelectImport = /import.*Select.*from.*react-select/.test(componentCode);
    const selectCount = (componentCode.match(/<Select/g) || []).length;
    
    return {
        hasCustomStyles,
        hasSelectImport,
        selectCount,
        needsMigration: hasCustomStyles && hasSelectImport,
        recommendation: hasCustomStyles 
            ? `This component has ${selectCount} Select components with custom styles that should be migrated to use centralized styles.`
            : `This component has ${selectCount} Select components that can use centralized styles.`
    };
};

/**
 * Generate migration code for a component
 * @param componentPath - The relative path to the component
 * @returns Migration code snippet
 */
export const generateMigrationCode = (componentPath: string) => {
    const relativePath = componentPath.replace(/^.*\/src\//, '');
    const importPath = relativePath.split('/').map(() => '..').join('/');
    
    return `// Add this import at the top of your component
import { selectStyles, statusSelectStyles, compactSelectStyles } from '${importPath}/styles/select-styles';

// Replace custom styles with:
// For standard dropdowns: styles={selectStyles}
// For status dropdowns: styles={statusSelectStyles}
// For compact dropdowns: styles={compactSelectStyles}`;
};

/**
 * Common patterns to look for when migrating select components
 */
export const migrationPatterns = {
    customHeight: /height:\s*['"]?\d+px['"]?/g,
    customPadding: /padding:\s*['"]?\d+px\s+\d+px['"]?/g,
    customMinHeight: /minHeight:\s*['"]?\d+px['"]?/g,
    customMaxHeight: /maxHeight:\s*['"]?\d+px['"]?/g,
};

/**
 * Validate that select styles are properly applied
 * @param componentCode - The component code as a string
 * @returns Validation result
 */
export const validateSelectStyles = (componentCode: string) => {
    const selectComponents = componentCode.match(/<Select[^>]*>/g) || [];
    const styledSelects = selectComponents.filter(select => 
        select.includes('styles={') && 
        (select.includes('selectStyles') || select.includes('statusSelectStyles') || select.includes('compactSelectStyles'))
    );
    
    return {
        totalSelects: selectComponents.length,
        styledSelects: styledSelects.length,
        unstyledSelects: selectComponents.length - styledSelects.length,
        isFullyStyled: styledSelects.length === selectComponents.length,
        missingStyles: selectComponents.length - styledSelects.length > 0 
            ? `${selectComponents.length - styledSelects.length} Select components are missing styles`
            : 'All Select components have proper styles'
    };
};

