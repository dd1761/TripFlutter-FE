"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingModal from "./LoadingModal";

interface IMixedKeyValue {
  [key: string | number]: string | number | any;
}

interface PageSizeDropdownProps {
  pageSize: number;
  pageSizes: number[];
  onPageSizeChange: (size: number) => void;
}

const DataTable = ({
  id,
  title = "",
  tableHeader = false,
  headerTitle = "",
  columns = [],
  data = [],
  headerButton = false,
  headerButtonTitle = "",
  headerButtonClick = () => {},
  pager = false, // 페이징 사용여부
  currentPage = 1, // 현재 페이지
  onRowClick,
  rowColorCondition,
  handlePageChange,
  datasCount,
}: {
  id?: string;
  title?: string;
  tableHeader?: boolean;
  headerTitle?: string;
  columns?: IMixedKeyValue[];
  data?: IMixedKeyValue[];
  headerButton?: boolean;
  headerButtonTitle?: string;
  headerButtonClick?: () => void;
  pager?: boolean;
  currentPage?: number;
  onRowClick?: (rowData: any) => void | boolean;
  rowColorCondition?: (rowData: IMixedKeyValue) => string;
  handlePageChange?: (page: number) => void | undefined;
  datasCount?: number;
}) => {
  const router = useRouter();

  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setSortedData(data);
      console.log(columns);
    }
  }, [data]);

  const sortData = (key: any) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sorted = [...data].sort((a, b) => {
      const aValue = a[key] || ""; // a[key]가 null 또는 undefined인 경우 빈 문자열로 대체합니다.
      const bValue = b[key] || ""; // b[key]가 null 또는 undefined인 경우 빈 문자열로 대체합니다.

      if (direction === "ascending") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setSortedData(sorted);

    setSortConfig({ key, direction });
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 접속 코드가 성공적으로 복사되었습니다.");
    } catch (error) {
      alert("접속 코드 복사 실패!");
    }
  };

  return !data ? (
    <>
      <LoadingModal />
    </>
  ) : (
    <TableContainer>
      <TableWrapper>
        {tableHeader && (
          <StyledTableHeader>
            <span>{headerTitle}</span>
          </StyledTableHeader>
        )}
        <StyledTable $tableHeader={tableHeader}>
          <thead>
            {columns.length > 0 && (
              <tr>
                {columns.map((item: IMixedKeyValue, index: number) => {
                  return (
                    <th
                      key={index}
                      onClick={() => item.sortable && sortData(item.key)}
                    >
                      {item.sortable ? (
                        <span
                          style={{
                            fontWeight: "700",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          {item?.title || ""}&nbsp;
                          {sortConfig?.key === item?.key ? (
                            <span>
                              {sortConfig.direction === "ascending" ? (
                                <Image
                                  alt="down"
                                  width={10}
                                  height={10}
                                  src={"/icons/icon_down_detail.svg"}
                                />
                              ) : (
                                <Image
                                  alt="up"
                                  width={10}
                                  height={10}
                                  src={"/icons/icon_up_detail.svg"}
                                />
                              )}
                            </span>
                          ) : (
                            <span>
                              <Image
                                alt="down"
                                width={10}
                                height={10}
                                src={"/icons/icon_down_detail.svg"}
                              />
                            </span>
                          )}
                        </span>
                      ) : (
                        <span style={{ fontWeight: "500" }}>
                          {item?.title || ""}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>

          <tbody>
            {(sortedData.length > 0 ? sortedData : data).map(
              (rowData, rowIndex) => (
                <StyledRow
                  key={rowIndex}
                  rowColor={
                    rowColorCondition ? rowColorCondition(rowData) : undefined
                  }
                  onClick={() => {
                    // onRowClick 값이 있을 때만 클릭 이벤트를 실행
                    if (onRowClick) {
                      onRowClick(rowData);
                    }
                  }}
                >
                  {columns.map((column, columnIndex) => {
                    return (
                      <td
                        key={columnIndex}
                        style={{
                          textAlign: column?.align ? column.align : "center",
                        }}
                      >
                        {console.log(`${column.key} : ${rowData[column.key]}`)}
                        {rowData[column.key]}
                      </td>
                    );
                  })}
                </StyledRow>
              )
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </TableContainer>
  );
};

export default DataTable;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  color: #171c26;
  width: 100%;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTable = styled.table<{
  $tableHeader: boolean;
}>`
  border-collapse: collapse;
  margin-top: ${(props) => (props.$tableHeader ? "45px" : "0px")};
  background: #ffffff;
  box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
    0px 1px 4px rgba(69, 75, 87, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.08);
  border-top-left-radius: ${(props) => (props.$tableHeader ? "0px" : "16px")};
  border-top-right-radius: ${(props) => (props.$tableHeader ? "0px" : "16px")};
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  overflow: auto;
  td {
    min-height: 64px;
    font-size: 0.8125rem;
    padding: 16px;
    text-align: center;
    th {
      padding: 16px;
      border-bottom: 1px solid #e9edf5;
      text-align: center;
    }

    thead {
      font-size: 12px;
      font-weight: 700;
      height: 41.53px;
      text-align: center;
    }

    @media screen and (max-width: 1024px) {
      table-layout: fixed;
      white-space: nowrap;
      display: block;
      overflow-x: auto;
    }
  }
`;

const StyledTableHeader = styled.div`
  width: 100%;
  height: 44px;
  background: #000;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
    0px 1px 4px rgba(69, 75, 87, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.08);

  display: flex;
  align-items: center;
  position: absolute;

  width: 100%;

  margin-top: 0px;
  font-size: 14px;
  font-weight: 700;

  span {
    margin-left: 10px;
  }
`;

const TableTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StyledRow = styled.tr<{ rowColor?: string }>`
  background-color: ${(props) => props.rowColor || "#fff"};

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;
