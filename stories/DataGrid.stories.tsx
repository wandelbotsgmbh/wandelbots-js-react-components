import type { GridColDef } from "@mui/x-data-grid"
import type { Meta, StoryObj } from "@storybook/react"
import { WandelbotsDataGrid } from "../src/components/DataGrid"

// Sample data types
interface Program {
  program: string
  name: string
  namespace?: string
  created_at: string
  updated_at?: string
}

interface User {
  id: number
  name: string
  email: string
  role: string
  lastLogin: string
}

// Sample data
const samplePrograms: Program[] = [
  {
    program: "prog-1",
    name: "Pick and Place Basic",
    namespace: "default",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:22:00Z",
  },
  {
    program: "prog-2",
    name: "Assembly Line Task",
    namespace: "production",
    created_at: "2024-01-10T08:15:00Z",
    updated_at: "2024-01-18T16:45:00Z",
  },
  {
    program: "prog-3",
    name: "Quality Check Routine",
    namespace: "quality",
    created_at: "2024-01-12T12:00:00Z",
  },
  {
    program: "prog-4",
    name: "Packaging Workflow",
    namespace: "packaging",
    created_at: "2024-01-08T09:30:00Z",
    updated_at: "2024-01-19T11:15:00Z",
  },
  {
    program: "prog-5",
    name: "Maintenance Procedure",
    namespace: "maintenance",
    created_at: "2024-01-05T14:20:00Z",
  },
]

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    role: "Admin",
    lastLogin: "2024-01-20T09:15:00Z",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@company.com",
    role: "Operator",
    lastLogin: "2024-01-19T14:30:00Z",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@company.com",
    role: "Engineer",
    lastLogin: "2024-01-18T11:45:00Z",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "Technician",
    lastLogin: "2024-01-17T16:20:00Z",
  },
]

const meta: Meta<typeof WandelbotsDataGrid> = {
  title: "Components/DataGrid",
  component: WandelbotsDataGrid,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A generic, reusable data grid component with built-in search and filtering capabilities.
Built on top of MUI X DataGrid, it provides a consistent interface for displaying tabular data
with advanced features like quick search, column filtering, and selection highlighting.

## Features
- **Search & Filter**: Built-in quick search and advanced column filtering
- **Generic Design**: Works with any data type through configurable transform functions  
- **Selection Support**: Highlight selected items and handle row clicks
- **Customizable**: Support for custom columns, toolbar, and DataGrid props
- **Responsive**: Automatically adapts to container size with proper scrolling
        `,
      },
    },
  },
  argTypes: {
    data: {
      control: false, // Disable control as it's handled by the story
    },
    columns: {
      control: false, // Disable control as it's handled by the story
    },
    getRowData: {
      control: false, // Disable control as it's handled by the story
    },
    getItemId: {
      control: false, // Disable control as it's handled by the story
    },
    onRowClick: {
      control: false, // Disable control as it's handled by the story
    },
    selectedItem: {
      control: false, // Disable control as it's handled by the story
    },
    title: {
      control: "text",
    },
    showCount: {
      control: "boolean",
    },
    searchPlaceholder: {
      control: "text",
    },
    selectFirstByDefault: {
      control: "boolean",
    },
    dataGridProps: {
      control: false, // Disable control as it's complex object
    },
  },
}

export default meta
type Story = StoryObj<typeof WandelbotsDataGrid>

export const Default: Story = {
  render: (args) => {
    const programColumns: GridColDef[] = [
      {
        field: "name",
        headerName: "Name",
        width: 200,
        flex: 1,
        sortable: true,
        filterable: true,
      },
      {
        field: "namespace",
        headerName: "Source",
        width: 150,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {params.value}
          </span>
        ),
      },
      {
        field: "lastChange",
        headerName: "Last Change",
        width: 150,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {params.value}
          </span>
        ),
      },
    ]

    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <WandelbotsDataGrid<Program>
          data={samplePrograms}
          columns={programColumns}
          getRowData={(program) => ({
            id: program.program,
            name: program.name,
            namespace: program.namespace || "N/A",
            lastChange: program.updated_at
              ? new Date(program.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              : new Date(program.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }),
          })}
          onRowClick={(program) => {
            console.log("Selected program:", program)
          }}
          getItemId={(program) => program.program}
          title={args.title}
          showCount={args.showCount}
          searchPlaceholder={args.searchPlaceholder}
          selectFirstByDefault={args.selectFirstByDefault}
          dataGridProps={{
            initialState: {
              sorting: {
                sortModel: [{ field: "lastChange", sort: "desc" }],
              },
            },
          }}
        />
      </div>
    )
  },
  args: {
    title: "Robot Programs",
    showCount: true,
    searchPlaceholder: "Search programs...",
    selectFirstByDefault: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Default interactive demo of the DataGrid component. 

**Try these features:**
- **Auto Selection**: Toggle "selectFirstByDefault" to automatically select the first item
- **Search**: Click the search icon and type to filter results
- **Filter**: Click the filter icon to access advanced column filtering
- **Sort**: Click column headers to sort data
- **Select**: Click on rows to see selection in the console

Notice the improved first column padding and how the first item is selected by default when enabled.

The component adapts automatically to different data structures and column configurations.
        `,
      },
    },
  },
}

export const UsersExample: Story = {
  render: (args) => {
    const userColumns: GridColDef[] = [
      {
        field: "name",
        headerName: "Name",
        width: 200,
        flex: 1,
        sortable: true,
        filterable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {params.value}
          </span>
        ),
      },
      {
        field: "role",
        headerName: "Role",
        width: 120,
        sortable: true,
        filterable: true,
      },
      {
        field: "lastLogin",
        headerName: "Last Login",
        width: 150,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {params.value}
          </span>
        ),
      },
    ]

    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <WandelbotsDataGrid<User>
          data={sampleUsers}
          columns={userColumns}
          getRowData={(user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            lastLogin: new Date(user.lastLogin).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
          })}
          onRowClick={(user) => {
            console.log("Selected user:", user)
          }}
          getItemId={(user) => user.id}
          title={args.title}
          showCount={args.showCount}
          searchPlaceholder={args.searchPlaceholder}
          selectFirstByDefault={args.selectFirstByDefault}
          dataGridProps={{
            initialState: {
              sorting: {
                sortModel: [{ field: "name", sort: "asc" }],
              },
            },
          }}
        />
      </div>
    )
  },
  args: {
    title: "Users",
    showCount: true,
    searchPlaceholder: "Search users...",
    selectFirstByDefault: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Example showing the DataGrid with a different data type (Users).

**Features demonstrated:**
- **Different Data Structure**: Shows how the component adapts to different data types
- **Custom Column Rendering**: Email and lastLogin columns use custom rendering with subdued colors
- **Different Sorting**: Default sort by name in ascending order
- **Type Safety**: Full TypeScript support with User interface

This demonstrates the component's flexibility in handling various data structures.
        `,
      },
    },
  },
}

export const InScrollableContainer: Story = {
  render: () => {
    // Generate more sample data to demonstrate scrolling
    const extendedPrograms: Program[] = [
      ...samplePrograms,
      ...Array.from({ length: 20 }, (_, i) => ({
        program: `prog-${i + 10}`,
        name: `Additional Program ${i + 1}`,
        namespace: ["default", "production", "quality", "packaging"][i % 4],
        created_at: `2024-01-${String((i % 30) + 1).padStart(2, "0")}T10:30:00Z`,
        updated_at: `2024-01-${String((i % 30) + 1).padStart(2, "0")}T14:22:00Z`,
      })),
    ]

    const programColumns: GridColDef[] = [
      {
        field: "name",
        headerName: "Name",
        width: 200,
        flex: 1,
        sortable: true,
        filterable: true,
      },
      {
        field: "namespace",
        headerName: "Source",
        width: 150,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {params.value}
          </span>
        ),
      },
      {
        field: "lastChange",
        headerName: "Last Change",
        width: 150,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {params.value}
          </span>
        ),
      },
    ]

    return (
      <div
        style={{
          height: "500px",
          width: "100%",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            flexShrink: 0,
          }}
        >
          <h3 style={{ margin: 0, color: "white" }}>
            Application Header (Fixed)
          </h3>
          <p style={{ margin: "8px 0 0 0", color: "rgba(255, 255, 255, 0.6)" }}>
            The DataGrid below has fixed column headers while the data rows
            scroll
          </p>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <WandelbotsDataGrid<Program>
            data={extendedPrograms}
            columns={programColumns}
            getRowData={(program) => ({
              id: program.program,
              name: program.name,
              namespace: program.namespace || "N/A",
              lastChange: program.updated_at
                ? new Date(program.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : new Date(program.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }),
            })}
            onRowClick={(program) => {
              console.log("Selected program:", program)
            }}
            getItemId={(program) => program.program}
            selectFirstByDefault={true}
            title="Programs"
            searchPlaceholder="Search programs..."
            dataGridProps={{
              initialState: {
                sorting: {
                  sortModel: [{ field: "lastChange", sort: "desc" }],
                },
              },
            }}
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Example showing the DataGrid with fixed headers in a constrained container.

**Key features demonstrated:**
- **Fixed Headers**: Column headers and toolbar remain visible while scrolling through data rows
- **Constrained Layout**: The container has a fixed height with application header
- **Internal Scrolling**: Only the data rows scroll, not the entire container
- **Extended Data**: Uses 24+ rows to clearly show the scrolling behavior
- **Proper Flex Layout**: Uses flexbox to ensure the grid takes available space

**How to test:**
1. Notice the toolbar with "Programs (24)" and search/filter buttons at the top
2. Scroll down through the data rows - the column headers stay fixed
3. Try searching or filtering - headers remain visible during interactions
4. The application header stays fixed outside the grid

This pattern is ideal for applications where the data grid is embedded within a larger interface.
        `,
      },
    },
  },
}
