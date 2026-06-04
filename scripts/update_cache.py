import json
import re

cache_path = r'I:\ZEN\scripts\polish_koans_cache.json'

with open(cache_path, 'r', encoding='utf-8') as f:
    cache = json.load(f)

# Batch 1 data
entries = {
    31: {
        "plTitle": "Wszystko jest najlepsze",
        "text": "Kiedy Banzan szedł przez rynek, podsłuchał przypadkiem rozmowę między rzeźnikiem, a jego klientem.\n\n- Daj mi najlepszy kawałek mięsa jaki masz - powiedział klient.\n\n- Wszystko w moim sklepie jest najlepsze - odparł rzeźnik. - Nie znajdziesz tutaj kawałka mięsa, który nie byłby najlepszy.\n\nUsłyszawszy te słowa, Banzan doznał oświecenia."
    },
    32: {
        "plTitle": "Cal czas stopa klejnot",
        "text": "Pewien możnowładca poprosił Takuana, nauczyciela zen, by podsunął mu pomysł na spędzanie wolnego czasu. Miał bowiem wrażenie, że jego dni dłużą się niemiłosiernie. Codziennie chodził do biura, gdzie siedział sztywno wyprostowany i przyjmował składane hołdy.\n\nTakuan napisał na kartce osiem chińskich symboli i dał je lordowi.\n\nŻaden dzień nie jest podwójny\n\n Cal czas stopa klejnot\n\n Ten dzień nie powtórzy się\n\n Każda minuta jest warta tyle, co drogocenny klejnot."
    },
    33: {
        "plTitle": "Ręka Mokusena",
        "text": "Mokusen Hiki mieszkał w świątyni w prowincji Tamba. Jeden z jego zwolenników skarżył się na skąpstwo żony.\n\nMokusen odwiedził szanowną małżonkę i przystawił jej do twarzy zaciśnięte pięści.\n\n- Co masz na myśli? - zapytała zaskoczona kobieta.\n\n- Przypuśćmy, że moja pięść zawsze taka była. Jak byś ją nazwała?\n\n- Zdeformowaną - odpowiedziała kobieta.\n\nWówczas mistrz otworzył dłoń na płasko.\n\n- Załóżmy, że zawsze byłaby taka. Co wtedy?\n\n- Inny rodzaj deformacji - powiedziała żona.\n\n- Skoro to rozumiesz jesteś dobrą żoną - Mokusen zakończył rozmowę i wyszedł.\n\nPo jego wizycie, żona pomagała swojemu mężowi wydawać pieniądze na równi z ich oszczędzaniem."
    },
    34: {
        "plTitle": "Uśmiech jego życia",
        "text": "Mokusen nigdy się nie uśmiechał, aż do ostatniego dnia swojego życia. Kiedy nadszedł jego czas, powiedział do najwierniejszych spośród swoich uczniów:\n\n- Studiowaliście pod moim okiem ponad dziesięć lat. Pokażcie mi prawdziwe zrozumienie zen. Ten, który wyrazi to najbardziej klarownie, zostanie moim następcą i otrzyma moje szaty oraz miskę.\n\nWszyscy przyglądali się surowej twarzy Mokusena, ale nikt nic nie powiedział.\n\nEncho, długoletni uczeń mistrza, przysunął się na skraj posłania. Podsunął ku nauczycielowi kubek z lekarstwem. To była jego odpowiedź.\n\nTwarz Mokusena przybrała jeszcze bardziej surowy wyraz.\n\n- Tylko tyle pojmujesz? - zapytał.\n\nEncho przestawił kubek w poprzednie miejsce.\n\nNa twarzy Mokusena pojawił się piękny uśmiech.\n\n- Ty draniu - powiedział do Encho. - Spędziłeś ze mną dziesięć lat, a jeszcze nie widziałeś całego mojego ciała. Weź szatę i miskę. Należą do ciebie."
    },
    35: {
        "plTitle": "Zen w każdej minucie",
        "text": "Adepci zen pozostają ze swoimi mistrzami co najmniej przez dziesięć lat, zanim ośmielą się uczyć innych. Nan-in został odwiedzony przez Tenno, który zakończywszy okres uczniowski, został nauczycielem. Dzień był deszczowy, więc Tenno założył drewniane chodaki i wziął parasol.\n\nPo powitaniu Nan-in zauważył:\n\n- Przypuszczam, że zostawiłeś swoje chodaki w przedpokoju. Chciałbym wiedzieć, czy twój parasol znajduje się po prawej czy po lewej stronie chodaków.\n\nZakłopotany Tenno, nie potrafił udzielić natychmiastowej odpowiedzi. Zrozumiał, że nie praktykował swojego zen w każdej minucie życia. Został uczniem Nan-ina i studiował jeszcze sześć lat, by to osiągnąć."
    },
    36: {
        "plTitle": "Deszcz kwiatów",
        "text": "Subhuti był uczniem Buddy. Potrafił pojąć potencjał pustki - poglądu, według którego nic nie istnieje inaczej, jak w swoim związku z subiektywnością i obiektywnością.\n\nPewnego dnia, w nastroju wzniosłej pustki, Subhuti siedział pod drzewem. Zaczęły na niego opadać kwiaty.\n\n- Chwalimy cię za rozprawę o pustce - szepnęli do niego bogowie.\n\n- Ale ja przecież nic nie mówiłem o pustce - rzekł Subhuti.\n\n- Ty nie mówiłeś o pustce, a my nie słyszeliśmy o pustce - odpowiedzieli bogowie. - To jest prawdziwa pustka.\n\nA kwiaty opadały niczym deszcz."
    },
    37: {
        "plTitle": "Publikacja sutr",
        "text": "Tetsugen, wielbiciel zen pochodzący z Japonii, zdecydował się opublikować sutry, które w tamtych czasach były dostępne jedynie w Chinach. Książki miały zostać wydrukowane przy użyciu drewnianych matryc w nakładzie siedmiu tysięcy egzemplarzy. To było ogromne przedsięwzięcie.\n\nTetsugen zaczął od podróży i zbierania datków na ten cel. Kilku sympatyków dało mu wprawdzie po sto sztuk złota, ale przez większość czasu otrzymywał jedynie drobne monety. Każdemu darczyńcy dziękował z taką samą wdzięcznością. Po dziesięciu latach Tetsugen miał wystarczająco dużo pieniędzy, by podjąć się realizacji swojego pomysłu.\n\nTak się złożyło, że w tym czasie wylała rzeka Uji. Ludzie zaczęli głodować. Tetsugen wydał wszystkie zebrane pieniądze na uratowanie wszystkich od śmierci głodowej. Potem zaczął gromadzić pieniądze od nowa.\n\nKilka lat później kraj ogarnęła epidemia. Tetsugen znowu wydał wszystkie zebrane przez siebie pieniądze, by pomóc ludziom.\n\nZaczął swoją pracę po raz trzeci i po dwudziestu latach jego marzenie się spełniło. Matryce drukarskie, za pomocą których powstało pierwsze japońskie wydanie sutr, można dzisiaj oglądać w klasztorze Obaku w Kioto.\n\nJapończycy opowiadają swoim dzieciom, że Tetsugen przygotował trzy zestawy sutr i że dwa pierwsze - niewidzialne - o niebo przewyższają ten ostatni."
    },
    38: {
        "plTitle": "Ciężka praca Gisho",
        "text": "W wieku dziesięciu lat Gisho została wyświęcona na mniszkę. Otrzymała takie samo wykształcenie, jak mali chłopcy. Kiedy skończyła lat szesnaście, zaczęła podróżować od jednego mistrza do drugiego, studiując pod bacznym okiem każdego z nich.\n\nSpędziła trzy lata z mistrzem Unzanem, sześć lat z Gukei, ale nie mogła doznać czystej wizji. W końcu udała się do mistrza Inzana.\n\nInzan nie wyróżniał jej ze względu na płeć. Karcił ją z siłą huraganu. Poszturchiwał i uderzał, by przebudzić jej wewnętrzną istotę. Gisho przebywała u Inzana przez trzynaście lat, aż wreszcie znalazła to, czego szukała!\n\nNa jej cześć Inzan napisał poniższy poemat:\n\nPod moim kierunkiem mniszka ta studiowała przez trzynaście lat.\n\n Wieczorami kontemplowała najgłębsze koany,\n\n Ranki spędzała w objęciach innych koanów.\n\n Chińska mniszka Tetsuma przewyższała wszystkich przed sobą,\n\n A od czasów Mujaku, nikt nie był tak prawdziwy jak Gisho!\n\n Mimo tego, jeszcze wiele bram będzie musiała przejść.\n\n Nadal powinna otrzymywać ciosy mojej żelaznej pięści.\n\nPo osiągnięciu oświecenia Gisho udała się do prowincji Banshu, gdzie założyła swoją własną świątynię zen i nauczała dwieście innych mniszek, zanim odeszła z tego świata pewnego roku w miesiącu sierpniu."
    },
    39: {
        "plTitle": "Spanie w ciągu dnia",
        "text": "Mistrz Soyen Shaku odszedł z tego świata w wieku sześćdziesięciu jeden lat. Wypełniając dzieło swego życia, pozostawił wspaniałą naukę, dużo bogatszą niż nauki innych mistrzów zen. Latem jego uczniowie mieli zwyczaj ucinania sobie drzemek w ciągu dnia, na co mistrz przymykał oko, choć sam nigdy nie tracił chwili.\n\nJuż w wieku dwunastu lat studiował filozoficzne rozważania Tendai. Pewnego letniego dnia powietrze było tak duszne, że mały Soyen wyciągnął nogi i zasnął pod nieobecność swojego nauczyciela.\n\nTrzy godziny później, nagle przebudzony, usłyszał wchodzącego mistrza. Było już jednak za późno. Leżał tuż przy wejściu.\n\n- Najmocniej przepraszam, najmocniej przepraszam - wyszeptał nauczyciel, przechodząc ostrożnie nad Soyenem, jakby był on jakimś wielce szanownym gościem. Od tej pory Soyen nigdy nie spał po południu."
    },
    40: {
        "plTitle": "W krainie snów",
        "text": "Nasz mistrz zwykł ucinać sobie drzemkę każdego popołudnia. Zapytaliśmy go, dlaczego to robi, a on odrzekł:\n\n- Udaję się do krainy snów, by spotkać się z starymi mędrcami, jak robił to Konfucjusz - kiedy Konfucjusz spał, śnił o starożytnych mędrcach, a potem opowiadał o nich swoim uczniom.\n\nPewnego dnia było bardzo gorąco, więc niektórzy z nas zdrzemnęli się. Nauczyciel skarcił nas.\n\n- Udaliśmy się do krainy snów, żeby spotkać się ze starożytnymi mędrcami, podobnie jak robił to Konfucjusz - wyjaśniliśmy.\n\n- Jaką wiadomość przekazali wam ci mędrcy? - zapytał mistrz.\n\n- Udaliśmy się do krainy snów, spotkaliśmy mędrców i zapytaliśmy ich czy nasz mistrz spędza tutaj każde popołudnie, a oni odpowiedzieli, że nigdy nie widzieli takiego człowieka."
    },
    41: {
        "plTitle": "Zen mistrza Joshu",
        "text": "Joshu rozpoczął studia nad zen w wieku sześćdziesięciu lat i kontynuował je do osiemdziesiątego roku życia, kiedy to urzeczywistnił naukę. Odtąd nauczał aż do chwili, kiedy skończył sto dwadzieścia lat.\n\n- Jeśli w moim umyśle nic nie ma, co mam zrobić? - zapytał go pewnego razu uczeń.\n\n- Wyrzuć to - odparł Joshu.\n\n- Ale, skoro nic nie mam, jak mogę to wyrzucić? - dociekał uczeń.\n\n- No cóż - powiedział Joshu - po prostu przestań to nosić."
    },
    42: {
        "plTitle": "Odpowiedź martwego człowieka",
        "text": "Kiedy Mamiya, który później został słynnym kaznodzieją, poszedł do nauczyciela po osobistą poradę, został poproszony o zademonstrowanie dźwięku jednej dłoni. Mamiya zastanowił się nad tym, jak mógłby brzmieć dźwięk jednej dłoni.\n\n- Nie pracujesz dość ciężko - powiedział mu nauczyciel. - Jesteś zbyt przywiązany do jedzenia, bogactwa, przedmiotów i tego dźwięku. Lepiej by było, gdybyś umarł.\n\nTo rozwiązałoby problem.\n\nKiedy Mamiya znowu pojawił się przed swoim nauczycielem, ponownie poproszono go o zademonstrowanie, co ma do pokazania w związku z dźwiękiem jednej dłoni. Mamiya natychmiast upadł, jakby był martwy.\n\n- No dobra, jesteś martwy - stwierdził nauczyciel. - Ale co z tym dźwiękiem?\n\n- Tego jeszcze nie rozwiązałem - odpowiedział Mamiya, spoglądając w górę.\n\n- Martwi ludzie nie mówią - powiedział nauczyciel. - Wynoś się!"
    },
    43: {
        "plTitle": "Zen w życiu żebraka",
        "text": "W swoich czasach Tosui był dobrze znanym nauczycielem zen. Mieszkał w kilku świątyniach i nauczał w różnych prowincjach.\n\nOstatnia z odwiedzonych przezeń świątyń zgromadziła tak wielu wyznawców, że Tosui powiedział im o swoim zamiarze całkowitego porzucenia nauczania. Poradził im, żeby rozeszli się i udali w dowolnych kierunkach. Po tym wydarzeniu wszelki ślad po nim zaginął.\n\nTrzy lata później jeden z jego uczniów odnalazł go żyjącego z żebrakami pod mostem w Kioto. Od razu zaczął błagać o przyjęcie na nauki.\n\n- Jeśli jesteś w stanie żyć tak jak ja chociaż przez kilka dni, może będę cię uczyć - odparł Tosui.\n\nByły uczeń przebrał się więc za żebraka i spędził dzień z Tosui. Następnego dnia zmarł jeden z żebraków. Tosui razem z uczniem o północy zanieśli jego ciało na zbocze góry, gdzie pochowali je. Następnie wrócili do swojego schronienia pod mostem.\n\nPrzez pozostałą część nocy Tosui spał jak zabity, natomiast jego uczeń nie mógł zmrużyć oka.\n\n- Nie musimy dzisiaj żebrać o jedzenie - powiedział Tosui, kiedy nastał ranek. - Nasz zmarły przyjaciel zostawił trochę.\n\nNiestety uczeń nie mógł przełknąć nawet kęsa.\n\n- Mówiłem ci, że nie dasz rady żyć tak jak ja - stwierdził Tosui. - Wynoś się stąd i nie zawracaj mi więcej głowy."
    },
    44: {
        "plTitle": "Złodziej, który został uczniem",
        "text": "Kiedy pewnego wieczoru Shichiri Kojun recytował sutry, wdarł się do jego domu złodziej uzbrojony w ostry miecz i zażądał pieniędzy albo życia.\n\n- Nie przeszkadzaj mi. Pieniądze znajdziesz w tamtej szufladzie - rzekł Shichiri i na nowo podjął recytację. Po chwili przerwał jednak i krzyknął:\n\n- Nie zabieraj wszystkiego. Potrzebuję trochę, żeby jutro zapłacić podatki.\n\nIntruz zabrał większość i zaczął zbierać się do wyjścia.\n\n- Powinieneś podziękować, kiedy dostajesz prezent - dodał Shichiri.\n\nMężczyzna podziękował i wyszedł.\n\nKilka dni później został złapany i przyznał się, między innymi, do obrabowania Shichiri'ego.\n\n- Ten człowiek nie jest złodziejem - powiedział Shichiri, kiedy został wezwany na świadka - przynajmniej nic mi o tym nie wiadomo. Podarowałem mu pieniądze i podziękował za nie.\n\nPo odbyciu kary, złodziej udał się do Shichiri'ego i został jego uczniem."
    },
    45: {
        "plTitle": "Dobro i zło",
        "text": "Kiedy Bankei prowadził swoje tygodniowe sesje medytacyjne w odosobnieniu, odwiedzali go uczniowie z wielu części Japonii. Podczas jednego z takich zgromadzeń pewien uczeń został przyłapany na kradzieży. O sprawie poinformowano mistrza Bankei i poproszono go o usunięcie winowajcy. Bankei zignorował zdarzenie.\n\nPóźniej przyłapano tego ucznia na podobnym uczynku, lecz Bankei znowu zlekceważył tę kwestię. Rozzłościło to pozostałych uczniów, którzy przygotowali petycję z prośbą o wyrzucenie złodzieja, w przeciwnym razie oni sami odejdą.\n\nKiedy Bankei przeczytał petycję, wezwał wszystkich do siebie.\n\n- Jesteście mądrymi mnichami - powiedział. - Wiecie co jest dobre, a co dobre nie jest. Możecie iść studiować gdzieś indziej, skoro chcecie, ale ten biedny brat nawet nie odróżnia dobra od zła. Kto go tego nauczy, jeśli nie ja? Zamierzam go tutaj zatrzymać nawet jeśli wy wszyscy odejdziecie.\n\nStrumień łez zalał twarz brata, który dopuszczał się kradzieży. Wszelkie pragnienie kradzieży zniknęło."
    }
}

# Add entries to cache
for num, data in entries.items():
    url = f"https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-{num}.php"
    cache[url] = {
        "url": url,
        "num": num,
        "plTitle": data["plTitle"],
        "text": data["text"],
        "textLength": len(data["text"])
    }

# Write updated cache
with open(cache_path, 'w', encoding='utf-8') as f:
    json.dump(cache, f, ensure_ascii=False, indent=2)

print(f"Batch 1 done! Cache now has {len(cache)} entries (31-45 added)")
"
