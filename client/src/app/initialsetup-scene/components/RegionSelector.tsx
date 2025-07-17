import { useInitialSetupStore } from "@/store/initialSetupStore";

export function RegionSelector() {
  const setRegion = useInitialSetupStore((state) => state.setRegion);
  const goToNextStep = useInitialSetupStore((state) => state.goToNextStep);

  const handleRegionClick = (region: string) => {
    setRegion(region);
    // 여기에서 선택한 지역 로직 추가 예를들면 db저장
    goToNextStep();
  };

  const regions = ["서울", "인천", "대전", "부산", "광주", "대구"];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">지역을 선택하세요</h2>
      <div className="grid grid-cols-2 gap-4">
        {regions.map((region) => (
          <div
            key={region}
            className="bg-gray-200 hover:bg-gray-300 cursor-pointer p-4 rounded text-center"
            onClick={() => handleRegionClick(region)}
          >
            {region.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}