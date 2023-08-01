import { Tabs, TabsList, TabsTrigger, TabsContent } from 'src/ui/tabs'
import FiltersTab from './tabs/Filters'
import AdjustmentsTab from './tabs/Adjustments'
import EffectsTab from './tabs/Effects'

const FilterTabs = () => {
  return (
    <Tabs defaultValue='filters'>
      <TabsList>
        <TabsTrigger value='filters'>Filters</TabsTrigger>
        <TabsTrigger value='adjustments'>Adjustments</TabsTrigger>
        <TabsTrigger value='effects'>Effects</TabsTrigger>
      </TabsList>
      <TabsContent value='filters'>
        <FiltersTab />
      </TabsContent>
      <TabsContent value='adjustments'>
        <AdjustmentsTab />
      </TabsContent>
      <TabsContent value='effects'>
        <EffectsTab />
      </TabsContent>
    </Tabs>
  )
}

export default FilterTabs
