import ClearIcon from "@mui/icons-material/Clear"
import FilterListIcon from "@mui/icons-material/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import { Box, Divider, Typography, useTheme } from "@mui/material"
import {
  DataGrid,
  type DataGridProps,
  FilterPanelTrigger,
  type GridColDef,
  type GridRowParams,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  QuickFilterTrigger,
  Toolbar,
  ToolbarButton,
  useGridApiRef,
} from "@mui/x-data-grid"
import { observer } from "mobx-react-lite"
import { useEffect, useMemo, useState } from "react"
import { externalizeComponent } from "../externalizeComponent"

export interface WandelbotsDataGridProps<T = Record<string, unknown>> {
  /**
   * Array of data items to display in the grid
   */
  data: T[]

  /**
   * Column definitions for the DataGrid
   */
  columns: GridColDef[]

  /**
   * Function to transform data items into DataGrid rows
   * Should return an object with an 'id' field and other fields matching column definitions
   */
  getRowData: (item: T) => Record<string, unknown> & { id: string | number }

  /**
   * Callback when a row is clicked
   */
  onRowClick?: (item: T, params: GridRowParams) => void

  /**
   * Currently selected item (for highlighting)
   */
  selectedItem?: T | null

  /**
   * Function to get the ID of an item (used for selection highlighting)
   */
  getItemId?: (item: T) => string | number

  /**
   * Title displayed in the toolbar
   */
  title?: string

  /**
   * Show item count in title
   * @default true
   */
  showCount?: boolean

  /**
   * Placeholder text for the search input
   * @default "Search"
   */
  searchPlaceholder?: string

  /**
   * Additional DataGrid props to pass through
   */
  dataGridProps?: Partial<DataGridProps>

  /**
   * Custom toolbar component to replace the default one
   */
  CustomToolbar?: React.ComponentType

  /**
   * Select the first item by default
   * @default false
   */
  selectFirstByDefault?: boolean

  /**
   * Custom sx styles for the root container
   */
  sx?: React.ComponentProps<typeof Box>["sx"]
}

export const WandelbotsDataGrid = externalizeComponent(
  observer(
    <T,>({
      data,
      columns,
      getRowData,
      onRowClick,
      selectedItem,
      getItemId,
      title,
      showCount = true,
      searchPlaceholder = "Search",
      dataGridProps,
      CustomToolbar,
      selectFirstByDefault = false,
      sx,
    }: WandelbotsDataGridProps<T>) => {
      const theme = useTheme()
      const apiRef = useGridApiRef()

      // Internal state for selection when not controlled
      const [internalSelectedItem, setInternalSelectedItem] =
        useState<T | null>(null)

      // Prepare rows for the DataGrid
      const rows = useMemo(() => data.map(getRowData), [data, getRowData])

      // Auto-resize columns when data changes
      useEffect(() => {
        if (apiRef.current && rows.length > 0) {
          apiRef.current.autosizeColumns({
            includeOutliers: true,
            includeHeaders: true,
            expand: true,
            columns: columns.map((col) => col.field),
          })
        }
      }, [rows, columns, apiRef])

      // Handle default selection - only use if no selectedItem is explicitly provided
      const effectiveSelectedItem = useMemo(() => {
        // If selectedItem is explicitly provided, use it (including null)
        if (selectedItem !== undefined) {
          return selectedItem
        }
        // If we have an internal selection, use it
        if (internalSelectedItem !== null) {
          return internalSelectedItem
        }
        // Otherwise, use first item if selectFirstByDefault is true
        if (selectFirstByDefault && data.length > 0) {
          const firstItem = data[0]
          // Set internal state to first item on initial load
          setInternalSelectedItem(firstItem)
          return firstItem
        }
        return null
      }, [selectFirstByDefault, data, selectedItem, internalSelectedItem])

      // Handle row click
      const handleRowClick = (params: GridRowParams) => {
        const item = data.find((item) => {
          const rowData = getRowData(item)
          return rowData.id === params.id
        })

        if (item) {
          // Update internal selection state if not controlled by props
          if (selectedItem === undefined) {
            setInternalSelectedItem(item)
          }

          // Call the user's onRowClick callback
          if (onRowClick) {
            onRowClick(item, params)
          }
        }
      }

      // Get selected row ID for highlighting
      const selectedRowId = useMemo(() => {
        if (!effectiveSelectedItem || !getItemId) return null
        return getItemId(effectiveSelectedItem)
      }, [effectiveSelectedItem, getItemId])

      // Default toolbar with filter and quick filter
      function DefaultToolbar() {
        return (
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: 1,
                p: 1,
                alignItems: "center",
              }}
            >
              {title && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "white",
                  }}
                >
                  {title}
                  {showCount && ` (${data.length})`}
                </Typography>
              )}
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <FilterPanelTrigger
                  render={
                    <ToolbarButton aria-label="Show filters">
                      <FilterListIcon fontSize="small" />
                    </ToolbarButton>
                  }
                />
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: "24px",
                    alignSelf: "center",
                  }}
                />
                <QuickFilter
                  render={(props, state) => (
                    <Box
                      {...props}
                      sx={{
                        display: "flex",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: state.expanded ? "4px 0 0 4px" : "4px",
                          borderRight: state.expanded ? "none" : undefined,
                        }}
                      >
                        <QuickFilterTrigger
                          render={
                            <ToolbarButton aria-label="Search">
                              <SearchIcon fontSize="small" />
                            </ToolbarButton>
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          overflow: "hidden",
                          transition: "all 0.3s ease-in-out",
                          width: state.expanded ? "192px" : "0px",
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            "& .MuiInputBase-root": {
                              height: "32px",
                              borderRadius:
                                state.expanded && state.value !== ""
                                  ? "0"
                                  : "0 4px 4px 0",
                            },
                          }}
                        >
                          <QuickFilterControl placeholder={searchPlaceholder} />
                        </Box>
                        {state.expanded && state.value !== "" && (
                          <QuickFilterClear
                            render={
                              <Box sx={{ borderRadius: "0 4px 4px 0" }}>
                                <ToolbarButton aria-label="Clear">
                                  <ClearIcon fontSize="small" />
                                </ToolbarButton>
                              </Box>
                            }
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                />
              </Box>
            </Box>
          </Toolbar>
        )
      }

      const ToolbarComponent = CustomToolbar || DefaultToolbar

      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor:
              theme.palette.backgroundPaperElevation?.[5] || "#202233",
            ...sx, // Your custom styles will override the theme default
          }}
        >
          <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            disableColumnMenu={false}
            disableRowSelectionOnClick={true}
            disableMultipleRowSelection={true}
            hideFooterSelectedRowCount={true}
            filterMode="client"
            sortingOrder={["desc", "asc"]}
            hideFooter={false}
            showToolbar={true}
            slots={{
              toolbar: ToolbarComponent,
            }}
            initialState={{
              sorting: {
                sortModel: [],
              },
              filter: {
                filterModel: {
                  items: [],
                },
              },
              ...dataGridProps?.initialState,
            }}
            {...dataGridProps}
            // Ensure autosize properties are always enabled and not overridden by dataGridProps
            autosizeOnMount={true}
            autosizeOptions={{
              // Merge any custom autosize options first
              ...(dataGridProps?.autosizeOptions || {}),
              // Force these key properties to always be true to maintain autosize behavior
              includeOutliers: true,
              includeHeaders: true,
              expand: true,
              // Auto-size all columns by default (can be overridden by dataGridProps)
              columns:
                dataGridProps?.autosizeOptions?.columns ||
                columns.map((col) => col.field),
            }}
            sx={{
              border: "none",
              backgroundColor: "transparent",
              width: "100%",
              // Remove any MUI overlays and elevation effects
              "& .MuiPaper-root": {
                backgroundColor: "transparent !important",
                boxShadow: "none !important",
              },
              "& .MuiDataGrid-overlay": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-main": {
                border: "none",
                backgroundColor: "transparent",
                // Remove any surface or paper overlays
                "& .MuiPaper-root": {
                  backgroundColor: "transparent !important",
                },
              },
              "& .MuiDataGrid-container--top [role=row]": {
                backgroundColor: "transparent !important",
              },
              "& .MuiDataGrid-topContainer": {
                borderBottom: "none !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                border: "none",
                borderBottom: "none !important",
                backgroundColor:
                  theme.palette.backgroundPaperElevation?.[5] || "#202233",
              },
              "& .MuiDataGrid-row": {
                cursor: onRowClick ? "pointer" : "default",
                border: "none",
                margin: "1px 0",
                position: "relative",
                "&:hover": {
                  backgroundColor: "transparent !important",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "16px",
                    right: "16px",
                    bottom: 0,
                    backgroundColor: "action.hover",
                    borderRadius: "16px",
                    zIndex: 0,
                  },
                },
                // Disable MUI's built-in selection styling completely
                "&.Mui-selected": {
                  backgroundColor: "transparent !important",
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                },
                // Highlight selected row with a distinct color using data attribute
                ...(selectedRowId !== null && {
                  [`&[data-id="${selectedRowId}"]`]: {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "16px",
                      right: "16px",
                      bottom: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.08) !important",
                      borderRadius: "16px",
                      zIndex: 0,
                    },
                    "&:hover::before": {
                      backgroundColor: "rgba(255, 255, 255, 0.12) !important",
                    },
                  },
                }),
              },
              "& .MuiDataGrid-cell--textLeft": {
                paddingLeft: "40px",
              },
              "& .MuiDataGrid-cell": {
                border: "none",
                position: "relative",
                zIndex: 1,
                "&:focus": {
                  outline: "none",
                },
                "&:focus-within": {
                  outline: "none",
                },
              },
              "& .MuiDataGrid-columnHeader": {
                border: "none",
                paddingLeft: "40px",
                paddingRight: "40px",
                backgroundColor: "transparent !important",
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
              },
              "& .MuiDataGrid-toolbarContainer": {
                padding: "8px",
                border: "none !important",
                borderBottom: "none !important",
                backgroundColor: "transparent !important",
                "& .MuiBox-root": {
                  backgroundColor: "transparent !important",
                },
                "& .MuiFormControl-root": {
                  backgroundColor: "transparent !important",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent !important",
                },
                "& .MuiPaper-root": {
                  backgroundColor: "transparent !important",
                  boxShadow: "none !important",
                },
                "& *": {
                  borderBottom: "none !important",
                },
              },
              "& .MuiDataGrid-toolbar": {
                borderBottom: "none !important",
              },
              "& .MuiDataGrid-toolbarFilterList": {
                border: "none",
              },
              "& .MuiDataGrid-withBorderColor": {
                borderColor: "transparent !important",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-footerContainer": {
                display: "none",
              },
              "& .MuiDataGrid-filler": {
                border: "none !important",
                borderTop: "none !important",
                borderBottom: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
                backgroundColor: "transparent !important",
                "--rowBorderColor": "none !important",
              },
              // Remove any remaining MUI background overlays
              "& .MuiBackdrop-root": {
                backgroundColor: "transparent !important",
              },
              "& .MuiModal-backdrop": {
                backgroundColor: "transparent !important",
              },
              ...dataGridProps?.sx,
            }}
          />
        </Box>
      )
    },
  ),
)

WandelbotsDataGrid.displayName = "WandelbotsDataGrid"
