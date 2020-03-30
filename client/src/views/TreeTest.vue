<template>
  <div>
    <tree :tree-data="build"></tree>
  </div>
</template>

<script>
  import Tree from "@/components/Tree";

  export default {
    data: () => ({
      build: {
        weapon: "SR-25",
        horizontal_recoil: 122,
        vertical_recoil: 50,
        ergonomics: 62,
        slots: [{
            slot: "Charge",
            compatibleAttachments: [{
              name: "Ambi SR-25",
              ergonomics: 1,
              image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/e/ee/KAC_Ambidextrous_Charging_Handle_for_AR-10_icon.png?version=ef290fe68aca1e081f9f57ea641a5214"
            }],
          },
          {
            slot: "Pistol Grip",
            compatibleAttachments: [{
              name: "Colt A2 AR-15 pistol grip",
              ergonomics: 5,
              image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/7/7e/A2m4standard.png?version=5469f79c3bb903f063f02b3fe27e2d34"
            }],
          },
          {
            slot: "Receiver",
            compatibleAttachments: [{
              name: "SR-25 Upper",
              ergonomics: 5,
              image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/0/0e/Upper_receiver_KAC_7.62x51_for_SR-25_rifle_icon.png?version=f852255212d6f3be7ebc57e880731309",
            }],
          }
        ]
      }
    }),
    components: {
      Tree
    }
  };

</script>
