import { readFileSync, writeFileSync } from 'fs';

const cachePath = 'I:\\ZEN\\scripts\\polish_koans_cache.json';
const cache = JSON.parse(readFileSync(cachePath, 'utf8'));

function add(num, url, title, text) {
  cache[url] = { url, num, plTitle: title, text, textLength: text.length };
}

add(31,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-31.php','Wszystko jest najlepsze',
`Kiedy Banzan szedł przez rynek, podsłuchał przypadkiem rozmowę między rzeźnikiem, a jego klientem.

- Daj mi najlepszy kawałek mięsa jaki masz - powiedział klient.

- Wszystko w moim sklepie jest najlepsze - odparł rzeźnik. - Nie znajdziesz tutaj kawałka mięsa, który nie byłby najlepszy.

Usłyszawszy te słowa, Banzan doznał oświecenia.`);

add(32,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-32.php','Cal czas stopa klejnot',
`Pewien możnowładca poprosił Takuana, nauczyciela zen, by podsunął mu pomysł na spędzanie wolnego czasu. Miał bowiem wrażenie, że jego dni dłużą się niemiłosiernie. Codziennie chodził do biura, gdzie siedział sztywno wyprostowany i przyjmował składane hołdy.

Takuan napisał na kartce osiem chińskich symboli i dał je lordowi.

Żaden dzień nie jest podwójny

 Cal czas stopa klejnot

 Ten dzień nie powtórzy się

 Każda minuta jest warta tyle, co drogocenny klejnot.`);

add(33,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-33.php','Ręka Mokusena',
`Mokusen Hiki mieszkał w świątyni w prowincji Tamba. Jeden z jego zwolenników skarżył się na skąpstwo żony.

Mokusen odwiedził szanowną małżonkę i przystawił jej do twarzy zaciśnięte pięści.

- Co masz na myśli? - zapytała zaskoczona kobieta.

- Przypuśćmy, że moja pięść zawsze taka była. Jak byś ją nazwała?

- Zdeformowaną - odpowiedziała kobieta.

Wówczas mistrz otworzył dłoń na płasko.

- Załóżmy, że zawsze byłaby taka. Co wtedy?

- Inny rodzaj deformacji - powiedziała żona.

- Skoro to rozumiesz jesteś dobrą żoną - Mokusen zakończył rozmowę i wyszedł.

Po jego wizycie, żona pomagała swojemu mężowi wydawać pieniądze na równi z ich oszczędzaniem.`);

add(34,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-34.php','Uśmiech jego życia',
`Mokusen nigdy się nie uśmiechał, aż do ostatniego dnia swojego życia. Kiedy nadszedł jego czas, powiedział do najwierniejszych spośród swoich uczniów:

- Studiowaliście pod moim okiem ponad dziesięć lat. Pokażcie mi prawdziwe zrozumienie zen. Ten, który wyrazi to najbardziej klarownie, zostanie moim następcą i otrzyma moje szaty oraz miskę.

Wszyscy przyglądali się surowej twarzy Mokusena, ale nikt nic nie powiedział.

Encho, długoletni uczeń mistrza, przysunął się na skraj posłania. Podsunął ku nauczycielowi kubek z lekarstwem. To była jego odpowiedź.

Twarz Mokusena przybrała jeszcze bardziej surowy wyraz.

- Tylko tyle pojmujesz? - zapytał.

Encho przestawił kubek w poprzednie miejsce.

Na twarzy Mokusena pojawił się piękny uśmiech.

- Ty draniu - powiedział do Encho. - Spędziłeś ze mną dziesięć lat, a jeszcze nie widziałeś całego mojego ciała. Weź szatę i miskę. Należą do ciebie.`);

add(35,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-35.php','Zen w każdej minucie',
`Adepci zen pozostają ze swoimi mistrzami co najmniej przez dziesięć lat, zanim ośmielą się uczyć innych. Nan-in został odwiedzony przez Tenno, który zakończywszy okres uczniowski, został nauczycielem. Dzień był deszczowy, więc Tenno założył drewniane chodaki i wziął parasol.

Po powitaniu Nan-in zauważył:

- Przypuszczam, że zostawiłeś swoje chodaki w przedpokoju. Chciałbym wiedzieć, czy twój parasol znajduje się po prawej czy po lewej stronie chodaków.

Zakłopotany Tenno, nie potrafił udzielić natychmiastowej odpowiedzi. Zrozumiał, że nie praktykował swojego zen w każdej minucie życia. Został uczniem Nan-ina i studiował jeszcze sześć lat, by to osiągnąć.`);

add(36,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-36.php','Deszcz kwiatów',
`Subhuti był uczniem Buddy. Potrafił pojąć potencjał pustki - poglądu, według którego nic nie istnieje inaczej, jak w swoim związku z subiektywnością i obiektywnością.

Pewnego dnia, w nastroju wzniosłej pustki, Subhuti siedział pod drzewem. Zaczęły na niego opadać kwiaty.

- Chwalimy cię za rozprawę o pustce - szepnęli do niego bogowie.

- Ale ja przecież nic nie mówiłem o pustce - rzekł Subhuti.

- Ty nie mówiłeś o pustce, a my nie słyszeliśmy o pustce - odpowiedzieli bogowie. - To jest prawdziwa pustka.

A kwiaty opadały niczym deszcz.`);

add(37,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-37.php','Publikacja sutr',
`Tetsugen, wielbiciel zen pochodzący z Japonii, zdecydował się opublikować sutry, które w tamtych czasach były dostępne jedynie w Chinach. Książki miały zostać wydrukowane przy użyciu drewnianych matryc w nakładzie siedmiu tysięcy egzemplarzy. To było ogromne przedsięwzięcie.

Tetsugen zaczął od podróży i zbierania datków na ten cel. Kilku sympatyków dało mu wprawdzie po sto sztuk złota, ale przez większość czasu otrzymywał jedynie drobne monety. Każdemu darczyńcy dziękował z taką samą wdzięcznością. Po dziesięciu latach Tetsugen miał wystarczająco dużo pieniędzy, by podjąć się realizacji swojego pomysłu.

Tak się złożyło, że w tym czasie wylała rzeka Uji. Ludzie zaczęli głodować. Tetsugen wydał wszystkie zebrane pieniądze na uratowanie wszystkich od śmierci głodowej. Potem zaczął gromadzić pieniądze od nowa.

Kilka lat później kraj ogarnęła epidemia. Tetsugen znowu wydał wszystkie zebrane przez siebie pieniądze, by pomóc ludziom.

Zaczął swoją pracę po raz trzeci i po dwudziestu latach jego marzenie się spełniło. Matryce drukarskie, za pomocą których powstało pierwsze japońskie wydanie sutr, można dzisiaj oglądać w klasztorze Obaku w Kioto.

Japończycy opowiadają swoim dzieciom, że Tetsugen przygotował trzy zestawy sutr i że dwa pierwsze - niewidzialne - o niebo przewyższają ten ostatni.`);

add(38,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-38.php','Ciężka praca Gisho',
`W wieku dziesięciu lat Gisho została wyświęcona na mniszkę. Otrzymała takie samo wykształcenie, jak mali chłopcy. Kiedy skończyła lat szesnaście, zaczęła podróżować od jednego mistrza do drugiego, studiując pod bacznym okiem każdego z nich.

Spędziła trzy lata z mistrzem Unzanem, sześć lat z Gukei, ale nie mogła doznać czystej wizji. W końcu udała się do mistrza Inzana.

Inzan nie wyróżniał jej ze względu na płeć. Karcił ją z siłą huraganu. Poszturchiwał i uderzał, by przebudzić jej wewnętrzną istotę. Gisho przebywała u Inzana przez trzynaście lat, aż wreszcie znalazła to, czego szukała!

Na jej cześć Inzan napisał poniższy poemat:

Pod moim kierunkiem mniszka ta studiowała przez trzynaście lat.

 Wieczorami kontemplowała najgłębsze koany,

 Ranki spędzała w objęciach innych koanów.

 Chińska mniszka Tetsuma przewyższała wszystkich przed sobą,

 A od czasów Mujaku, nikt nie był tak prawdziwy jak Gisho!

 Mimo tego, jeszcze wiele bram będzie musiała przejść.

 Nadal powinna otrzymywać ciosy mojej żelaznej pięści.

Po osiągnięciu oświecenia Gisho udała się do prowincji Banshu, gdzie założyła swoją własną świątynię zen i nauczała dwieście innych mniszek, zanim odeszła z tego świata pewnego roku w miesiącu sierpniu.`);

add(39,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-39.php','Spanie w ciągu dnia',
`Mistrz Soyen Shaku odszedł z tego świata w wieku sześćdziesięciu jeden lat. Wypełniając dzieło swego życia, pozostawił wspaniałą naukę, dużo bogatszą niż nauki innych mistrzów zen. Latem jego uczniowie mieli zwyczaj ucinania sobie drzemek w ciągu dnia, na co mistrz przymykał oko, choć sam nigdy nie tracił chwili.

Już w wieku dwunastu lat studiował filozoficzne rozważania Tendai. Pewnego letniego dnia powietrze było tak duszne, że mały Soyen wyciągnął nogi i zasnął pod nieobecność swojego nauczyciela.

Trzy godziny później, nagle przebudzony, usłyszał wchodzącego mistrza. Było już jednak za późno. Leżał tuż przy wejściu.

- Najmocniej przepraszam, najmocniej przepraszam - wyszeptał nauczyciel, przechodząc ostrożnie nad Soyenem, jakby był on jakimś wielce szanownym gościem. Od tej pory Soyen nigdy nie spał po południu.`);

add(40,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-40.php','W krainie snów',
`Nasz mistrz zwykł ucinać sobie drzemkę każdego popołudnia. Zapytaliśmy go, dlaczego to robi, a on odrzekł:

- Udaję się do krainy snów, by spotkać się z starymi mędrcami, jak robił to Konfucjusz - kiedy Konfucjusz spał, śnił o starożytnych mędrcach, a potem opowiadał o nich swoim uczniom.

Pewnego dnia było bardzo gorąco, więc niektórzy z nas zdrzemnęli się. Nauczyciel skarcił nas.

- Udaliśmy się do krainy snów, żeby spotkać się ze starożytnymi mędrcami, podobnie jak robił to Konfucjusz - wyjaśniliśmy.

- Jaką wiadomość przekazali wam ci mędrcy? - zapytał mistrz.

- Udaliśmy się do krainy snów, spotkaliśmy mędrców i zapytaliśmy ich czy nasz mistrz spędza tutaj każde popołudnie, a oni odpowiedzieli, że nigdy nie widzieli takiego człowieka.`);

add(41,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-41.php','Zen mistrza Joshu',
`Joshu rozpoczął studia nad zen w wieku sześćdziesięciu lat i kontynuował je do osiemdziesiątego roku życia, kiedy to urzeczywistnił naukę. Odtąd nauczał aż do chwili, kiedy skończył sto dwadzieścia lat.

- Jeśli w moim umyśle nic nie ma, co mam zrobić? - zapytał go pewnego razu uczeń.

- Wyrzuć to - odparł Joshu.

- Ale, skoro nic nie mam, jak mogę to wyrzucić? - dociekał uczeń.

- No cóż - powiedział Joshu - po prostu przestań to nosić.`);

add(42,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-42.php','Odpowiedź martwego człowieka',
`Kiedy Mamiya, który później został słynnym kaznodzieją, poszedł do nauczyciela po osobistą poradę, został poproszony o zademonstrowanie dźwięku jednej dłoni. Mamiya zastanowił się nad tym, jak mógłby brzmieć dźwięk jednej dłoni.

- Nie pracujesz dość ciężko - powiedział mu nauczyciel. - Jesteś zbyt przywiązany do jedzenia, bogactwa, przedmiotów i tego dźwięku. Lepiej by było, gdybyś umarł.

To rozwiązałoby problem.

Kiedy Mamiya znowu pojawił się przed swoim nauczycielem, ponownie poproszono go o zademonstrowanie, co ma do pokazania w związku z dźwiękiem jednej dłoni. Mamiya natychmiast upadł, jakby był martwy.

- No dobra, jesteś martwy - stwierdził nauczyciel. - Ale co z tym dźwiękiem?

- Tego jeszcze nie rozwiązałem - odpowiedział Mamiya, spoglądając w górę.

- Martwi ludzie nie mówią - powiedział nauczyciel. - Wynoś się!`);

add(43,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-43.php','Zen w życiu żebraka',
`W swoich czasach Tosui był dobrze znanym nauczycielem zen. Mieszkał w kilku świątyniach i nauczał w różnych prowincjach.

Ostatnia z odwiedzonych przezeń świątyń zgromadziła tak wielu wyznawców, że Tosui powiedział im o swoim zamiarze całkowitego porzucenia nauczania. Poradził im, żeby rozeszli się i udali w dowolnych kierunkach. Po tym wydarzeniu wszelki ślad po nim zaginął.

Trzy lata później jeden z jego uczniów odnalazł go żyjącego z żebrakami pod mostem w Kioto. Od razu zaczął błagać o przyjęcie na nauki.

- Jeśli jesteś w stanie żyć tak jak ja chociaż przez kilka dni, może będę cię uczyć - odparł Tosui.

Były uczeń przebrał się więc za żebraka i spędził dzień z Tosui. Następnego dnia zmarł jeden z żebraków. Tosui razem z uczniem o północy zanieśli jego ciało na zbocze góry, gdzie pochowali je. Następnie wrócili do swojego schronienia pod mostem.

Przez pozostałą część nocy Tosui spał jak zabity, natomiast jego uczeń nie mógł zmrużyć oka.

- Nie musimy dzisiaj żebrać o jedzenie - powiedział Tosui, kiedy nastał ranek. - Nasz zmarły przyjaciel zostawił trochę.

Niestety uczeń nie mógł przełknąć nawet kęsa.

- Mówiłem ci, że nie dasz rady żyć tak jak ja - stwierdził Tosui. - Wynoś się stąd i nie zawracaj mi więcej głowy.`);

add(44,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-44.php','Złodziej, który został uczniem',
`Kiedy pewnego wieczoru Shichiri Kojun recytował sutry, wdarł się do jego domu złodziej uzbrojony w ostry miecz i zażądał pieniędzy albo życia.

- Nie przeszkadzaj mi. Pieniądze znajdziesz w tamtej szufladzie - rzekł Shichiri i na nowo podjął recytację. Po chwili przerwał jednak i krzyknął:

- Nie zabieraj wszystkiego. Potrzebuję trochę, żeby jutro zapłacić podatki.

Intruz zabrał większość i zaczął zbierać się do wyjścia.

- Powinieneś podziękować, kiedy dostajesz prezent - dodał Shichiri.

Mężczyzna podziękował i wyszedł.

Kilka dni później został złapany i przyznał się, między innymi, do obrabowania Shichiri'ego.

- Ten człowiek nie jest złodziejem - powiedział Shichiri, kiedy został wezwany na świadka - przynajmniej nic mi o tym nie wiadomo. Podarowałem mu pieniądze i podziękował za nie.

Po odbyciu kary, złodziej udał się do Shichiri'ego i został jego uczniem.`);

add(45,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-45.php','Dobro i zło',
`Kiedy Bankei prowadził swoje tygodniowe sesje medytacyjne w odosobnieniu, odwiedzali go uczniowie z wielu części Japonii. Podczas jednego z takich zgromadzeń pewien uczeń został przyłapany na kradzieży. O sprawie poinformowano mistrza Bankei i poproszono go o usunięcie winowajcy. Bankei zignorował zdarzenie.

Później przyłapano tego ucznia na podobnym uczynku, lecz Bankei znowu zlekceważył tę kwestię. Rozzłościło to pozostałych uczniów, którzy przygotowali petycję z prośbą o wyrzucenie złodzieja, w przeciwnym razie oni sami odejdą.

Kiedy Bankei przeczytał petycję, wezwał wszystkich do siebie.

- Jesteście mądrymi mnichami - powiedział. - Wiecie co jest dobre, a co dobre nie jest. Możecie iść studiować gdzieś indziej, skoro chcecie, ale ten biedny brat nawet nie odróżnia dobra od zła. Kto go tego nauczy, jeśli nie ja? Zamierzam go tutaj zatrzymać nawet jeśli wy wszyscy odejdziecie.

Strumień łez zalał twarz brata, który dopuszczał się kradzieży. Wszelkie pragnienie kradzieży zniknęło.`);

writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
console.log('Saved ' + Object.keys(cache).length + ' entries');
