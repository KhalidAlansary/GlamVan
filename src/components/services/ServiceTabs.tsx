import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ServiceTabs = ({ activeTab, setActiveTab }: ServiceTabsProps) => {
  return (
    <TabsList className="grid grid-cols-5 bg-gray-100">
      <TabsTrigger
        value="all"
        onClick={() => setActiveTab("all")}
        className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
      >
        All
      </TabsTrigger>
      <TabsTrigger
        value="hair"
        onClick={() => setActiveTab("hair")}
        className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
      >
        Hair
      </TabsTrigger>
      <TabsTrigger
        value="makeup"
        onClick={() => setActiveTab("makeup")}
        className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
      >
        Makeup
      </TabsTrigger>
      <TabsTrigger
        value="nails"
        onClick={() => setActiveTab("nails")}
        className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
      >
        Nails
      </TabsTrigger>
      <TabsTrigger
        value="lashes"
        onClick={() => setActiveTab("lashes")}
        className="data-[state=active]:bg-salon-purple data-[state=active]:text-white"
      >
        Lashes
      </TabsTrigger>
    </TabsList>
  );
};

export default ServiceTabs;
