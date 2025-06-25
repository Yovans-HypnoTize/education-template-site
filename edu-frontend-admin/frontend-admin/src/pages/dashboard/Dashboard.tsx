import {
  PeopleAlt as PeopleIcon,
  ConfirmationNumber as TicketIcon,
  CheckCircle as ResolvedIcon,
  PendingActions as PendingIcon,
  Cancel as RejectedIcon,
  QuestionAnswer as EnquiryIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { memo, use, useEffect, useMemo, useState } from "react";
import { GetDashboardchartAction, GetDashboardDetailsAction } from "./features/dashboardSlice";
import { startLoading, stopLoading } from "../auth/features/authSlice";
import { notifyError } from "../../utils/toast";
import { useCounterAnimation } from "../../utils/useCounterAnimation";
import { BarChart } from "@mui/x-charts/BarChart";
import DateRangePicker from "../../components/Input/DateRangePicker";
import dayjs from "dayjs";
import { LineChart } from "@mui/x-charts";

const DashboardCard = memo(({ title, count: finalCount, icon: Icon, colorClass, iconColor }: any) => {
  const count = useCounterAnimation(finalCount, 1500, "easeInOut");

  return (
    <div className="bg-white rounded-xl p-2 flex items-center space-x-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`${colorClass} rounded-lg p-4 flex items-center justify-center`}>
        <Icon className={`text-3xl ${iconColor}`} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
});

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<any>([dayjs().subtract(6, "day").toDate(), dayjs().toDate()]);
  const { details: dashboardDetail, chart } = useAppSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(startLoading());
    dispatch(GetDashboardDetailsAction())
      .then((res: any) => {
        if (res.type.includes("fulfilled")) {
          // Handle successful profile fetch
        } else {
          console.log("Profile fetch failed", res);
          notifyError(res?.payload?.message || "Something went wrong");
        }
      })
      .finally(() => dispatch(stopLoading()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(startLoading());
    console.log("Selected Date:", selectedDate);
    dispatch(
      GetDashboardchartAction({
        fromDate:
          selectedDate[0] && selectedDate[0] !== null
            ? dayjs(selectedDate[0]).format("YYYY-MM-DD")
            : dayjs().subtract(6, "day").format("YYYY-MM-DD"),
        toDate: selectedDate[1] ? dayjs(selectedDate[1]).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
      })
    )
      .then((res: any) => {
        if (res.type.includes("fulfilled")) {
        } else {
          console.log("Chart fetch failed", res);
          notifyError(res?.payload?.message || "Something went wrong");
        }
      })
      .finally(() => dispatch(stopLoading()));
  }, [dispatch, selectedDate]);

  const cards = useMemo(
    () => [
      {
        title: "Total Registered Users",
        count: dashboardDetail?.data?.userCount || 0,
        icon: PeopleIcon,
        colorClass: "bg-gradient-to-r from-blue-500 to-blue-700",
        iconColor: "text-blue-200",
      },
      {
        title: "Total Enquiries",
        count: dashboardDetail?.data?.enquiryCount || 0,
        icon: EnquiryIcon,
        colorClass: "bg-gradient-to-r from-indigo-500 to-indigo-700",
        iconColor: "text-indigo-200",
      },
      {
        title: "Total Tickets",
        count: dashboardDetail?.data?.supportTicketCount || 0,
        icon: TicketIcon,
        colorClass: "bg-gradient-to-r from-purple-500 to-purple-700",
        iconColor: "text-purple-200",
      },
      {
        title: "Resolved Tickets",
        count: dashboardDetail?.data?.supportResolvedCount || 0,
        icon: ResolvedIcon,
        colorClass: "bg-gradient-to-r from-green-500 to-green-700",
        iconColor: "text-green-200",
      },
      {
        title: "Pending Tickets",
        count: dashboardDetail?.data?.supportPendingCount || 0,
        icon: PendingIcon,
        colorClass: "bg-gradient-to-r from-yellow-500 to-yellow-700",
        iconColor: "text-yellow-200",
      },
      {
        title: "Rejected Tickets",
        count: dashboardDetail?.data?.supportRejectedCount || 0,
        icon: RejectedIcon,
        colorClass: "bg-gradient-to-r from-red-500 to-red-700",
        iconColor: "text-red-200",
      },
    ],
    [dashboardDetail]
  );
  const last7WorkingDays = Array.from({ length: 100 }, (_, i) => dayjs().subtract(i, "day"))
    .filter((d) => d.day() !== 0 && d.day() !== 6)
    .slice(0, 7)
    .map((d) => d.format("ddd, DD MMM"));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            count={card.count}
            icon={card.icon}
            colorClass={card.colorClass}
            iconColor={card.iconColor}
          />
        ))}
      </div>
      <div className="p-4 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Analytics</h2>
          </div>
          <div>
            <DateRangePicker
              value={[dayjs(selectedDate[0]).toDate(), dayjs(selectedDate[1]).toDate()]}
              onChange={(value: any) => {
                if (value?.start && value?.end) {
                  const start = dayjs(value.start);
                  const end = dayjs(value.end);
                  if (end.diff(start, "day") > 30) {
                    notifyError("Please select a date range of maximum 30 days");
                    return;
                  }
                }
                setSelectedDate([value?.start, value?.end]);
              }}
            />
          </div>
        </div>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data:
                chart?.data?.getUserCount?.map((item: any) => dayjs(item.date).format("ddd, DD MMM")) ||
                last7WorkingDays,
            },
          ]}
          series={[
            { data: chart?.data?.getEnquiryCount?.map((item: any) => item.count) || [], label: "Enquiries" },
            { data: chart?.data?.getTicketCount?.map((item: any) => item.count) || [], label: "Tickets" },
            { data: chart?.data?.getUserCount?.map((item: any) => item.count) || [], label: "Registered Users" },
          ]}
          height={300}
        />
      </div>
    </>
  );
};

export default Dashboard;
