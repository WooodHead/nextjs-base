import DataTable from "@/components/data-table";
import { DEFAULT_FILTER } from "@/constants/filter";
import { getPaymentHistories } from "@/services/reconciliation";
import { API, TableFilter } from "@/types/api";
import { localDateTime } from "@/utils/datetime";
import { FileSearchOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { useQuery } from "@tanstack/react-query";
import { Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Reconciliation() {
  const [queryFilter, setQueryFilter] = useState<TableFilter>(DEFAULT_FILTER);
  const [col, setCol] = useState<any>();

  const {
    isFetching,
    refetch: _,
    data: response,
  } = useQuery({
    queryKey: ["payment-history", JSON.stringify(queryFilter)],
    queryFn: () => getPaymentHistories(queryFilter),
    onSuccess: (data) => {},
  });

  useEffect(() => {
    setCol(columns);
  }, []);

  const columns: ProColumns<API.PaymentHistory>[] = [
    {
      title: "Ref Num",
      key: "refNum",
      dataIndex: "refNum",
      ellipsis: true,
      width: 300,
      copyable: true,
    },
    {
      title: "MG",
      key: "mgId",
      dataIndex: "mgId",
      width: 125,
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   render: (value, _entity, _index, _action) => {
    //     const color = value === "success" ? "green" : "red";
    //     return <Tag color={color}>{value}</Tag>;
    //   },
    //   hideInSearch: true,
    // },
    // {
    //   title: "Payment Amount",
    //   key: "paymentAmount",
    //   dataIndex: "paymentAmount",
    //   render: (value) => {
    //     return (
    //       <NumericFormat
    //         value={value as number}
    //         thousandSeparator=","
    //         decimalSeparator="."
    //         suffix="đ"
    //         displayType="text"
    //       />
    //     );
    //   },
    //   hideInSearch: true,
    //   sorter: true, // show sort arrows
    // },
    // {
    //   title: "Recon Fee",
    //   key: "reconFee",
    //   dataIndex: "reconFee",
    //   render: (value) => {
    //     return (
    //       <NumericFormat
    //         value={value as number}
    //         thousandSeparator=","
    //         decimalSeparator="."
    //         suffix="đ"
    //         displayType="text"
    //       />
    //     );
    //   },
    //   hideInSearch: true,
    //   sorter: true, // show sort arrows
    // },
    // {
    //   title: "FT Amount",
    //   key: "ftAmount",
    //   dataIndex: "ftAmount",
    //   render: (value) => {
    //     return (
    //       <NumericFormat
    //         value={value as number}
    //         thousandSeparator=","
    //         decimalSeparator="."
    //         suffix="đ"
    //         displayType="text"
    //       />
    //     );
    //   },
    //   hideInSearch: true,
    //   sorter: true, // show sort arrows
    // },
    // {
    //   title: "Partner",
    //   key: "partner",
    //   dataIndex: "partner",
    //   hideInSearch: true,
    // },
    // {
    //   title: "Partner ID",
    //   key: "partnerId",
    //   dataIndex: "partnerId",
    // },
    // {
    //   title: "FT Fee ID",
    //   key: "ftFeeId",
    //   dataIndex: "ftFeeId",
    //   ellipsis: true,
    //   width: 200,
    //   copyable: true,
    //   hideInSearch: true,
    // },
    // {
    //   title: "FT Payment ID",
    //   key: "ftPaymentId",
    //   dataIndex: "ftPaymentId",
    //   ellipsis: true,
    //   width: 200,
    //   copyable: true,
    //   hideInSearch: true,
    // },
    // {
    //   title: "Request Time",
    //   key: "timeRequest",
    //   dataIndex: "timeRequest",
    //   render: (value, _entity, _index, _action) =>
    //     localDateTime(value as string),
    // },
    // {
    //   title: "Response Time",
    //   key: "timeResponse",
    //   dataIndex: "timeResponse",
    //   render: (value, _entity, _index, _action) =>
    //     localDateTime(value as string),
    // },
    // {
    //   title: "Request ID",
    //   key: "requestId",
    //   dataIndex: "requestId",
    //   ellipsis: true,
    //   copyable: true,
    //   width: 200,
    // },
    // {
    //   key: "action",
    //   render: (_value, entity, _index, _action) => (
    //     <Space>
    //       <FileSearchOutlined
    //         style={{
    //           marginLeft: 10,
    //           fontSize: 20,
    //           color: "#d81921",
    //         }}
    //         type=""
    //         onClick={() => {}}
    //       />
    //     </Space>
    //   ),
    //   hideInSearch: true,
    //   width: 50,
    // },
  ];

  return (
    <DataTable
      loading={isFetching}
      columns={columns}
      dataSource={response?.data.results}
      request={async (params, sort, _filter): Promise<any> => {
        const sortBy = (() => {
          if (JSON.stringify(sort) === "{}") return "createdAt:asc";

          for (const [key, value] of Object.entries(sort)) {
            return `${key}:${(value as string).replace(/end$/, "")}`;
          }
        })();

        const options = {
          current: params.current,
          pageSize: params.pageSize,
          sortBy,
        };

        const filter = (() => {
          const paramsCopy = JSON.parse(JSON.stringify(params));

          delete paramsCopy.current;
          delete paramsCopy.pageSize;
          // remove all keys that have undefined, null or '' value.
          for (const [key, value] of Object.entries(paramsCopy)) {
            if ([null, undefined, ""].includes(value as any)) {
              delete paramsCopy[key];
            }
          }

          return paramsCopy;
        })();
        setQueryFilter({ options, filter });
      }}
      scroll={{ x: 2500 }}
      pagination={{ ...response?.data.meta }}
      rowSelection={{}}
      // toolBarRender={(_action, _rows): any => {
      //   const accessible = API_URLS.reconciliation.getPaymentHistories();

      //   return (
      //     <AccessDenied accessible={accessible}>
      //       <Button type="primary">Export CSV</Button>
      //     </AccessDenied>
      //   );
      // }}
    />
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const context = await getServerSession(context);
//   try {
//     const reponse = await getPayment
//   }
//   return
// }
