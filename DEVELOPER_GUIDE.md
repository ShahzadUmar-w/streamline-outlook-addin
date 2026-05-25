# Streamline Add-In: Developer Guide

## Adding a New Request Type

To add a new request type to the form system, edit **`RequestDefinitions.ts`**:

### 1. Add Type to Union
```typescript
export type RequestType = 
  | "General Legal Request"
  | "Vendor Contract Request"
  | "Your New Request Type";  // Add here
```

### 2. Add to requestTypes Array
```typescript
export const requestTypes: RequestType[] = [
  "General Legal Request",
  "Vendor Contract Request",
  "Your New Request Type",  // Add here
];
```

### 3. Define Fields & Form
```typescript
export const requestForms: Record<RequestType, ...> = {
  // ...existing forms...
  
  "Your New Request Type": {
    description: "Description shown to users",
    fields: [
      {
        name: "fieldName",
        label: "Display Label",
        type: "text",  // or "textarea", "select", "note"
        required: true,
        placeholder: "Enter...",
      },
      // Add more fields as needed
    ],
  },
};
```

### 4. Field Options Reference

**Text Field**
```typescript
{
  name: "email",
  label: "Email Address",
  type: "text",
  required: true,
  placeholder: "user@example.com",
}
```

**Text Area**
```typescript
{
  name: "details",
  label: "Detailed Description",
  type: "textarea",
  required: true,
  placeholder: "Provide full details...",
}
```

**Select Dropdown**
```typescript
{
  name: "priority",
  label: "Priority Level",
  type: "select",
  required: true,
  options: ["High", "Medium", "Low"],
}
```

**Note (Display Only)**
```typescript
{
  name: "attachment_note",
  label: "Attach supporting documents to this email.",
  type: "note",  // No input field shown
}
```

### 5. Conditional Fields

Show a field only when another field has a specific value:

```typescript
{
  name: "otherValue",
  label: "If 'Other', please specify",
  type: "text",
  conditional: (values) => values.entityType === "Other",
}
```

## Modifying Existing Forms

### Update Field Options
Edit the `options` array in `RequestDefinitions.ts`:

```typescript
options: [
  "Option 1",
  "Option 2",
  "New Option",  // Add here
],
```

### Change Required Status
```typescript
{
  name: "fieldName",
  label: "Field Label",
  type: "text",
  required: false,  // Change this
}
```

### Update Field Label or Placeholder
```typescript
{
  name: "fieldName",
  label: "Updated Label Text",
  type: "text",
  placeholder: "New placeholder text",
}
```

## Component Customization

### Styling the Form

Edit `RequestForm.tsx` `useStyles` to customize colors, spacing, etc.:

```typescript
const useStyles = makeStyles({
  formShell: {
    // Your CSS styles here
    padding: "32px",  // Increase padding
    backgroundColor: "white",
  },
});
```

### Adding a Button or Action

In `RequestForm.tsx`:

```typescript
<div className={styles.actions}>
  <Button appearance="primary" onClick={handleInsert}>
    Insert request summary into message
  </Button>
  <Button appearance="secondary" onClick={handleReset}>
    Clear Form
  </Button>
</div>
```

### Modifying the Summary Format

The `buildSummary()` function in `RequestForm.tsx` generates the text inserted into the message:

```typescript
const buildSummary = () => {
  const summaryLines = [
    `Request Type: ${requestType}`,
    // Add custom formatting here
    ...activeFields.map((field) => {
      if (field.type === "note") return field.label;
      const value = values[field.name] || "(not provided)";
      return `${field.label}: ${value}`;
    }),
  ];
  return summaryLines.join("\n");
};
```

## Header Component Customization

Edit `Header.tsx` to change branding or layout:

```typescript
<Header
  title="Streamline Add-In Taxonomy"
  logo="../assets/logo-filled.svg"
  message="Your custom message here"
/>
```

## Working with Fluent UI Components

The form uses Fluent UI React v9. Documentation: https://react.fluentui.dev/

**Common Components Used:**
- `Button` – Submit/action buttons
- `Input` – Text entry fields
- `Textarea` – Multi-line text
- `Select` / `Option` – Dropdown lists
- `Field` – Form field wrapper with labels
- `Body1`, `Caption1` – Text styles

Example:
```typescript
import { Button, Input, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  button: {
    backgroundColor: tokens.colorBrandBackground,
  },
});
```

## Building and Testing

### Local Development
```bash
npm start
# Opens https://localhost:3000/ with hot reload
```

### Test in Outlook
1. Start dev server: `npm start`
2. In Outlook, go to Get Add-ins → My Add-ins → Upload Custom Add-in
3. Upload the manifest.xml from the project root
4. Open a new message and click the Streamline ribbon button

### Debug in Browser
Open https://localhost:3000/taskpane.html in a browser to test the UI independently.

### Production Build
```bash
npm run build
# Creates optimized build in dist/ folder
```

## Code Style

### File Naming
- Components: `PascalCase.tsx` (e.g., `RequestForm.tsx`)
- Utilities: `camelCase.ts` (e.g., `RequestDefinitions.ts`)
- Folders: `lowercase` (e.g., `forms/`, `components/`)

### TypeScript
- Use strict mode (enabled in tsconfig.json)
- Define interfaces for all data structures
- Avoid `any` types

Example:
```typescript
export interface RequestFieldDefinition {
  name: string;
  label: string;
  type: RequestFieldType;
  required?: boolean;
}
```

### React Best Practices
- Use functional components
- Memoize expensive computations with `useMemo`
- Use `useCallback` for event handlers passed as props
- Keep components focused and single-responsibility

## Troubleshooting

### Form fields not appearing?
- Check `conditional` function logic in RequestDefinitions
- Verify field `name` matches the key in `values` object
- Check browser console for errors

### Summary not inserting?
- Verify `insertText()` is correctly called
- Check Office API context initialization in `index.tsx`
- Ensure manifest.xml has correct permissions

### Build errors?
- Run `npm install` to ensure dependencies are installed
- Clear `dist/` and `node_modules/` and reinstall
- Check for TypeScript errors: `npx tsc --noEmit`

## Resources

- Office JavaScript API: https://learn.microsoft.com/en-us/javascript/api/overview/office
- Fluent UI React: https://react.fluentui.dev/
- Outlook Add-in Development: https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/
- TypeScript Handbook: https://www.typescriptlang.org/docs/

---
**Last Updated**: May 22, 2026
