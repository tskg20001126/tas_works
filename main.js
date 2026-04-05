/**
 * TAS works Portfolio - Main Script
 */

const worksData = [
    {
        id: "work-8",
        title: "秋保木の家ロッジ村　案内図（宮城県）",
        category: "Graphic / Map",
        thumb: "./ポートフォリオ/秋保木の家ロッジ村　案内図（宮城県）.png",
        year: "2022",
        overview: "秋保エリアの「木の家」施設を案内するマップ。ぬくもりのある手書き風の要素を取り入れつつ、必要な情報がすっきりと伝わるようにレイアウトしています。",
        role: "Design, Illustration",
        tools: "Illustrator, Photoshop"
    },
    {
        id: "work-7",
        title: "糸島イリスロード商店街 看板デザイン（福岡県）",
        category: "Signage / Map",
        thumb: "./ポートフォリオ/糸島イリスロード商店街 看板デザイン（福岡県）.jpg",
        year: "2023",
        overview: "糸島イリスロードに設置する屋外看板用の案内マップ。遠くからでも目を引く配色と、自然の豊かさを感じさせるデザインで、観光客の回遊性を高める工夫を凝らしました。",
        role: "Signage Design",
        tools: "Illustrator"
    },
    {
        id: "work-3",
        title: "利府町観光マップ〈海側〉（宮城県）",
        category: "Graphic / Map",
        thumb: "./ポートフォリオ/利府町観光マップ〈海側〉（宮城県）.png",
        year: "2023",
        overview: "利府町の海側エリアを中心とした観光マップ。団体旅行客向けに、情報量を整理しつつも、エリアの魅力が伝わるようなカラーリングとレイアウトを施しました。",
        role: "Graphic Design",
        tools: "Illustrator"
    },
    {
        id: "work-4",
        title: "利府町観光マップ〈街中〉（宮城県）",
        category: "Graphic / Map",
        thumb: "./ポートフォリオ/利府町観光マップ〈街中〉（宮城県）.png",
        year: "2023",
        overview: "利府町の市街地を中心とした観光マップ。歩いて回れる楽しい街歩きをサポートするため、細やかな配慮と視認性の高いアイコンを採用しています。",
        role: "Graphic Design",
        tools: "Illustrator"
    },
    {
        id: "work-2",
        title: "機那サフラン酒醸造所 案内図（新潟県）",
        category: "Branding / Graphic",
        thumb: "./ポートフォリオ/機那サフラン酒醸造所 案内図（新潟県）.png",
        year: "2024",
        overview: "伝統的なサフラン酒の販促ビジュアル。オレンジの背景を用い、クラシックな製品にコンテンポラリーなエッセンスを加えて、新しい顧客層へアピールするデザインを目指しました。",
        role: "Graphic Design",
        tools: "Photoshop, Illustrator"
    },
    {
        id: "work-6",
        title: "東員町　コミュニティマップ（三重県）",
        category: "Graphic / Map",
        thumb: "./ポートフォリオ/東員町　コミュニティマップ（三重県）.png",
        year: "2024",
        overview: "東員町の地域住民向けコミュニティマップ。地域のつながりを感じさせるデザインで、各施設へのアクセスを視覚的にわかりやすく整理しました。",
        role: "Art Direction, Design",
        tools: "Illustrator"
    },
    {
        id: "work-5",
        title: "名古屋市名東区 コミュニティマップ（愛知県）",
        category: "Graphic / Real Estate",
        thumb: "./ポートフォリオ/名古屋市名東区 コミュニティマップ（愛知県）.png",
        year: "2022",
        overview: "名東区宝が丘の周辺環境を紹介するエリア案内。上品で落ち着いたトーンを基調に、ファミリー層に安心感を与えるデザインに仕上げました。",
        role: "Design, Illustration",
        tools: "Illustrator, Photoshop"
    },
    {
        id: "work-1",
        title: "しまなみ海道エリアMAP",
        category: "Graphic / Map",
        thumb: "./ポートフォリオ/しまなみ海道エリアMAP.png",
        year: "2023",
        overview: "しまなみ海道周辺の観光スポットをわかりやすく伝えるためのエリアマップデザイン。広大なエリアを直感的に把握できるよう、シンプルでありながら温かみのあるイラストとタイポグラフィで構成しました。",
        role: "Art Direction, Design",
        tools: "Illustrator, Photoshop"
    }
];

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. Render Works Grid
    // ==========================================
    const worksGrid = document.getElementById("worksGrid");

    worksData.forEach(work => {
        const card = document.createElement("article");
        card.className = "work-card";
        card.dataset.id = work.id;

        // Use lazy loading for performance and smooth UX
        card.innerHTML = `
            <div class="work-thumb-wrapper">
                <img src="${work.thumb}" alt="${work.title}" class="work-thumb" loading="lazy">
            </div>
            <div class="work-info">
                <div class="work-category">${work.category}</div>
                <h3 class="work-title">${work.title}</h3>
            </div>
        `;

        // Add click listener for modal
        card.addEventListener("click", () => openModal(work));
        worksGrid.appendChild(card);
    });

    // ==========================================
    // 2. Hero Section Parallax Automation
    // ==========================================
    const heroBg = document.getElementById("heroBg");
    const heroContent = document.getElementById("heroContent");
    const heroSection = document.getElementById("hero");

    let currentProgress = 0;

    function updateHero() {
        if (!heroSection) return;

        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // Progress goes from 0 (top) to 1 (when scrolled past hero height)
        const targetProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

        // LERP for smooth lagging effect (0.08 multiplier)
        currentProgress += (targetProgress - currentProgress) * 0.08;

        // When progress > 0.99 and target is 1, we can stop updating to save resources? 
        // No, keep updating for smooth reverse scroll

        // Apply computed parallax transformations using CSS Custom Properties
        if (heroBg && heroContent) {
            // Background Image transforms (moves slower)
            const bgTranslateY = currentProgress * -40; // translateY: progress * -40px
            const bgScale = 1 + currentProgress * 0.06; // scale: 1 + progress * 0.06
            const bgOpacity = 1 - currentProgress * 1.0; // opacity: 1 - progress * 1.0

            heroBg.style.setProperty('--bg-y', `${bgTranslateY}px`);
            heroBg.style.setProperty('--bg-scale', bgScale.toFixed(4));
            heroBg.style.setProperty('--bg-opacity', Math.max(bgOpacity, 0).toFixed(4));

            // Foreground Content transforms (moves faster to create depth)
            const textTranslateY = currentProgress * -80; // translateY: progress * -80px
            const textOpacity = 1 - currentProgress * 1.2; // fade out faster

            heroContent.style.setProperty('--content-y', `${textTranslateY}px`);
            heroContent.style.setProperty('--content-opacity', Math.max(textOpacity, 0).toFixed(4));
        }

        requestAnimationFrame(updateHero);
    }

    // Start animation loop
    requestAnimationFrame(updateHero);

    // ==========================================
    // 3. Modal Functionality
    // ==========================================
    const modal = document.getElementById("workModal");
    const closeBtn = document.getElementById("modalClose");

    function openModal(work) {
        // Populate specific data
        document.getElementById("modalTitle").textContent = work.title;
        document.getElementById("modalCategory").textContent = work.category;
        document.getElementById("modalOverview").textContent = work.overview;
        document.getElementById("modalRole").textContent = work.role;
        document.getElementById("modalTools").textContent = work.tools;

        const img = document.getElementById("modalImage");
        img.src = work.thumb;
        img.alt = work.title;

        // Open Modal and apply body overflow hidden
        modal.classList.add("is-open");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        modal.classList.remove("is-open");
        document.body.classList.remove("modal-open");
    }

    // Modal Events
    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        // If clicking outside the modal content (.modal-content stops propagation implicitly if check element target)
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
});
