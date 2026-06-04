import { writeFileSync } from 'fs';

const cache = {};

function add(num, url, title, text) {
  cache[url] = { url, num, plTitle: title, text, textLength: text.length };
}

add(1, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-1.php', 'Filiżanka herbaty',
`Nan-in, japoński mistrz żyjący w epoce Meiji , gościł profesora z pobliskiego uniwersytetu, który przyszedł dowiedzieć się czegoś o zen.

Nan-in zaproponował mu herbatę. Napełniał swojemu gościowi filiżankę, lecz kiedy ta była już pełna, Nan-in nie przestawał nalewać.

Profesor patrzył jak napój rozlewa się po powierzchni stołu, aż w końcu nie wytrzymał.

- Filiżanka jest przepełniona - powiedział do mistrza. - Więcej herbaty się nie zmieści!

- Podobnie jak ta filiżanka - odparł Nan-in - jesteś przepełniony własnymi opiniami i rozważaniami. Jak mogę pokazać ci zen, jeśli najpierw nie opróżnisz filiżanki?`);

add(2, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-2.php', 'Jak znaleźć diament na zabłoconej drodze?',
`W swoim czasie Gudo był nauczycielem samego cesarza, wolał jednakże prowadzić życie wędrownego żebraka. Pewnego razu, kiedy zmierzał w kierunku Edo, kulturalnej i politycznej stolicy szogunatu, zaszedł do małej wioski o nazwie Takenaka. Nastał już wieczór i padał ulewny deszcz. Gudo był przemoczony do suchej nitki, a jego słomiane sandały były w strzępach. W oknie jednej z chat na skraju wioski zauważył cztery pary sandałów, więc postanowił kupić jedną z nich, ponieważ były suche.

Kobieta, która sprzedała sandały, widząc jak był mokry, zaproponowała mu nocleg w swoim domu. Gudo z wdzięcznością przyjął zaproszenie. Po wejściu do środka, wyrecytował sutrę przed rodzinnym ołtarzem. Następnie przedstawiono go matce kobiety i jej dzieciom. Zauważywszy, że cała rodzina jest przygnębiona, Gudo zapytał, co takiego się wydarzyło.

- Mój mąż jest hazardzistą i pijakiem - odpowiedziała gospodyni. - Jeśli zdarzy mu się wygrać, upija się i bardzo źle nas traktuje. Gdy natomiast przegrywa, zapożycza się u innych. Czasami wypija tak dużo wina, że w ogóle nie wraca do domu na noc. Co mam począć?

- Pomogę mu - powiedział Gudo. - Weź te pieniądze. Kup mi galon najlepszego wina i coś dobrego do jedzenia. Potem możesz udać się na spoczynek. Ja będę medytować przed ołtarzem.

Mąż kobiety wrócił do domu około północy, oczywiście pijany, i wrzasnął na całe gardło:

- Hej, żono, wróciłem! Masz dla mnie coś do jedzenia?

- Ja mam coś dla ciebie - powiedział Gudo. - Złapał mnie deszcz, a twoja żona łaskawie zaoferowała mi gościnę na noc. W zamian kupiłem nieco wina i ryb, możesz się zatem częstować do woli.

Mężczyzna bardzo się ucieszył. Wypił wino jednym haustem i ułożył się na podłodze do snu. Gudo usiadł przy nim i medytował.

Nazajutrz mężczyzna nie pamiętał poprzedniej nocy.

- Kim jesteś? Skąd się tu wziąłeś? - zapytał zaraz po przebudzeniu wciąż medytującego Gudo.

- Jestem Gudo z Kioto i zmierzam do Edo - odparł mistrz zen.

Mężczyzna spłonął ze wstydu. Wylewnie przeprosił człowieka, który był nauczycielem samego cesarza.

Ten jedynie się uśmiechnął.

- Wszystko w życiu jest nietrwałe - wyjaśnił. - Życie jest bardzo krótkie. Jeśli będziesz poświęcał czas hazardowi i piciu, zabraknie ci czasu do wykonania czegokolwiek innego. A przez to najbardziej ucierpi twoja rodzina.

W tym momencie mężczyznę olśniło, jakby obudził się z długiego snu.

- Masz rację - powiedział do mistrza. - Jak będę w stanie się kiedykolwiek odwdzięczyć za tak wspaniałą naukę? Pozwól, że kawałek cię odprowadzę i poniosę twoje rzeczy.

- Jeśli chcesz... - zgodził się Gudo.

Wyruszyli więc w drogę. Gdy uszli trzy mile Gudo poprosił mężczyznę, by ten wrócił do domu.

- Jeszcze z pięć mil - błagał mężczyzna, więc kontynuowali swoją podróż.

- Możesz już zawrócić - zasugerował Gudo po przejściu tych pięciu mil.

- Zawrócę po kolejnych dziesięciu milach - odpowiedział mężczyzna.

- Wracaj do domu - powiedział Gudo, gdy mieli za sobą kolejne dziesięć mil.

- Będę za tobą podążał do końca swoich dni - oświadczył mężczyzna.

Współcześni japońscy nauczyciele zen wywodzą w prostej linii od sławnego mistrza, który był następcą Gudo. Nazywał się Mu-nan - człowiek, który nie zawrócił.`);

add(3, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-3.php', 'Doprawdy?',
`Mistrz zen imieniem Hakuin był chwalony przez swoich sąsiadów za prowadzenie cnotliwego życia.

W pobliżu jego domu mieszkała piękna dziewczyna, której rodzice prowadzili sklep spożywczy. Pewnego dnia, ni stąd, ni zowąd, rodzice odkryli, że ich córka jest brzemienna. Fakt ten bardzo ich rozzłościł. Tym bardziej, że nie chciała zdradzić, kim jest ojciec dziecka. Dopiero po długich namowach podała imię Hakuina.

Jeszcze bardziej rozgniewani, rodzice udali się do domu mistrza.

- Doprawdy? - to było jedyne, co mistrz miał do powiedzenia na ten temat.

Po narodzinach, dziecko zaniesiono Hakuinowi. Do tego czasu zdążył już utracić dobre imię w okolicy, nie przeszkadzało mu to jednak i otoczył dziecko bardzo troskliwą opieką. Od sąsiadów otrzymał mleko i wszystko, co tylko było maleństwu potrzebne.

Minął rok. Matka dziecka nie mogła już dłużej znieść całej sytuacji. Powiedziała rodzicom prawdę - ojcem dziecka był pewien młody człowiek, który pracował na targu rybnym.

Rodzice dziewczyny natychmiast udali się do Hakuina, by prosić go o wybaczenie i zabrać dziecko z powrotem.

Hakuin nie miał nic przeciwko temu. Kiedy rodzice przyznali, że dziecko nie jest jego, przekazując im niemowlę, zapytał tylko:

- Doprawdy?`);

add(4, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-4.php', 'Posłuszeństwo',
`W wykładach mistrza Bankei uczestniczyli nie tylko adepci zen, lecz osoby wszystkich warstw społecznych oraz wyznań. Mistrz nigdy nie recytował sutr i nie pozwalał sobie na przeprowadzanie scholastycznych rozpraw. Zamiast tego, jego słowa płynęły prosto z serca, docierając bezpośrednio do serc słuchaczy.

Ogromna ilość słuchaczy mistrza rozgniewała kapłana sekty nichiren , ponieważ wielu zwolenników owej sekty odeszło, by posłuchać o zen u Bankei'a. Egocentryczny kapłan nichiren przyszedł do świątyni, zdecydowany podjąć dyskusję z mistrzem.

- Hej, nauczycielu zen - zawołał. - Poczekaj chwilę. Każdy człowiek darzący cię szacunkiem będzie posłuszny twemu słowu, lecz ja nie darzę cię szacunkiem.

Potrafisz sprawić, bym i ja był ci posłuszny?

- Podejdź tu do mnie, a udowodnię ci - powiedział Bankei.

Przepełniony dumą, kapłan utorował sobie drogę przez tłum do nauczyciela.

Bankei uśmiechnął się.

- Choć, usiądź po mojej lewej stronie.

Kapłan zgodził się.

- Nie - powiedział Bankei - lepiej będzie nam się rozmawiało, jeśli usiądziesz po mojej prawej stronie. Przejdź tutaj.

Kapłan z godnością przeszedł na prawą stronę.

- Jak widzisz - rzekł Bankei - jesteś wobec mnie całkiem posłuszny i mam wrażenie, że jesteś bardzo uprzejmym człowiekiem. A teraz siadaj i słuchaj.`);

add(5, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-5.php', 'Jeśli kochasz, kochaj otwarcie',
`Dwudziestu mnichów i jedna mniszka, która nazywała się Eshun, praktykowali medytację z pewnym mistrzem zen.

Mimo ogolonej głowy i skromnej sukienki, Eshun promieniowała pięknem. Kilku mnichów potajemnie kochało się w niej. Jeden z nich napisał nawet list miłosny, nalegając na spotkanie w cztery oczy.

Eshun nie odpisała na list. Następnego dnia mistrz wygłosił wykład dla swych uczniów, a gdy już było po wszystkim, Eshun wstała. Kierując swoje słowa do autora listu, powiedziała:

- Jeśli naprawdę kochasz mnie tak bardzo jak twierdzisz, podejdź teraz i obejmij mnie.`);

add(6, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-6.php', 'Uprzejmość pozbawiona miłości',
`Żyła w Chinach pewna stara kobieta, która przez dwadzieścia lat utrzymywała mnicha. Kazała wybudować dla niego małą chatkę i karmiła go, kiedy medytował. W końcu zapragnęła się dowiedzieć, jakie przez cały ten czas poczynił postępy.

By się przekonać, skorzystała z pomocy bardzo ponętnej dziewczyny.

- Idź i obejmij go - powiedziała dziewczynie - a potem zapytaj: "Co teraz zrobimy?"

Dziewczyna odwiedziła mnicha i bez większych ceregieli obsypała go pieszczotami, pytając na koniec, co zamierza z tym zrobić.

- Stare drzewo rośnie zimą na zimnym kamieniu - odparł mnich nieco poetycko. - Nigdzie nie znajduje ciepła.

Dziewczyna wróciła do starej kobiety i zrelacjonowała wypowiedź mnicha.

- Pomyśleć, że karmiłam tego człowieka przez dwadzieścia lat! - zawołała rozgniewana staruszka. - Nie wykazał żadnego zainteresowania twoimi potrzebami, najmniejszej ochoty do zrozumienia twojego położenia. Nie musiał odpowiadać pożądaniem na namiętność, powinien jednak okazać choć odrobinę współczucia.

Natychmiast poszła do chaty mnicha i spaliła ją.`);

add(7, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-7.php', 'Obwieszczenie',
`W ostatnim dniu swojego życia Tanzan napisał sześćdziesiąt kart pocztowych i poprosił swego ucznia, by je rozesłał. Potem umarł.

Karty zawierały dwa krótkie zdania:

Opuszczam ten świat.

 To moje ostatnie ogłoszenie.

 Tanzan

 27 lipca 1892 r.`);

add(8, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-8.php', 'Wspaniałe Fale',
`W początkowym okresie ery Meiji żył znany zapaśnik imieniem O-nami, co znaczyło Wspaniałe Fale.

O-nami był nieludzko silny i doskonale znał sztukę zapaśniczą. Podczas walk toczonych na prywatnym ringu pokonał nawet swojego nauczyciela. Jednakże publiczne występy tak go onieśmielały, że jego uczniowie z łatwością rzucali go na łopatki.

O-nami uznał, że musi odwiedzić mistrza zen i poprosić o pomoc. Hakuju, wędrowny nauczyciel, zatrzymał się ostatnio w pobliskiej świątyni, więc O-nami odwiedził go i opowiedział o swoim wielkim problemie.

- Twoje imię brzmi Wspaniałe Fale - stwierdził nauczyciel - więc zostań na noc w tej świątyni. Wyobraź sobie, że jesteś takimi właśnie falami. Nie jesteś już przerażonym zapaśnikiem. Jesteś olbrzymimi falami, które zmiatają wszystko na swojej drodze, pochłaniają każdą stojącą przed nimi rzecz. Zrób jak mówię, a zostaniesz najwspanialszym zapaśnikiem w kraju.

Nauczyciel udał się na spoczynek. O-nami usiadł, by rozpocząć medytację. Próbował wyobrazić sobie siebie jako morskie fale. Rozmyślał po drodze o wielu różnych rzeczach. Stopniowo, coraz wyraźniej zaczynał postrzegać siebie jako fale. Im noc stawała się głębsza, tym fale bardziej rosły i rosły. Zmiotły kwiaty w wazonach, które do tej pory stały w świątyni. Nawet posąg Buddy utonął w odmętach. Zanim nastał świt świątynia była już tylko jednym wielkim przypływem i odpływem ogromnego oceanu.

Rankiem nauczyciel znalazł O-namiego wciąż pogrążonego w medytacji z lekkim uśmiechem na twarzy. Poklepał go po ramieniu.

- Teraz nic już nie może cię pokonać - powiedział. - Jesteś falami, o których rozmawialiśmy wczoraj. Będziesz zmiatał wszystko na swojej drodze.

Tego samego dnia O-nami wystartował w zawodach zapaśniczych i wygrał. Od tej pory nikt w całej Japonii nie był w stanie go pokonać.`);

add(9, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-9.php', 'Nie można ukraść księżyca',
`Ryokan, mistrz zen, wiódł proste życie w małym domku u podnóża góry. Pewnego wieczoru złodziej odwiedził chatę tylko po to, by przekonać się, że nie ma w niej nic, co mógłby ukraść.

Ryokan akurat wrócił do domu i przyłapał go na gorącym uczynku.

- Przebyłeś długą drogę, by mnie odwiedzić - powiedział do bandyty - więc nie powinieneś odejść z pustymi rękoma. Proszę, przyjmij moje ubranie w prezencie.

Złodziej był zszokowany. Wziął ubranie i ulotnił się czym prędzej.

Nagi Ryokan usiadł i przyjrzał się księżycowi.

- Biedny człowiek - westchnął. - Chciałbym dać mu ten piękny księżyc.`);

add(10, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-10.php', 'Ostatni wiersz Hoshina',
`Mistrz zen Hoshin mieszkał w Chinach przez wiele lat, po czym wrócił do północno-wschodniej części Japonii, gdzie nauczał swoich uczniów. Pewnego dnia, opowiedział im zasłyszaną w Chinach opowieść. Oto ta historia:

Pod koniec roku, dwudziestego piątego grudnia, Tokufu, który był już bardzo stary, rzekł do swoich uczniów:

- W przyszłym roku nie będę już żył, więc w tym roku powinniście mnie dobrze traktować.

Uczniowie pomyśleli, że mistrz żartuje. Skoro jednak był on nauczycielem o wielkim sercu, każdy z nich zapraszał go na ucztę w kolejnych dniach mijającego roku.

Tuż przed rozpoczęciem nowego roku Tokufu stwierdził:

- Byliście dla mnie bardzo dobrzy. Opuszczę was jutro popołudniu, jak tylko śnieg przestanie padać.

Uczniowie śmiali się myśląc, że stary mistrz mówi od rzeczy, ponieważ nocne niebo było czyste i nie zanosiło się na opady. Jednakże o północy śnieg zaczął sypać, a następnego dnia nikt nie mógł odnaleźć nauczyciela. W końcu ktoś zajrzał do sali medytacyjnej i tam znalazł jego ciało.

Hoshin, który opowiadał tę historię, rzekł do swoich uczniów:

- Dla mistrza zen wiedza na temat dnia swojej śmierci nie jest niezbędna, ale jeśli naprawdę mu na tym zależy - może się tego dowiedzieć.

- Czy ty również to potrafisz? - zapytał ktoś.

- Tak - odpowiedział Hoshin. - Pokażę wam, co potrafię za siedem dni.

Żaden z uczniów nie uwierzył mu, a część z nich nawet zdążyła zapomnieć całą rozmowę do czasu, gdy Hoshin znowu ich wezwał.

- Przed siedmioma dniami - rzekł - powiedziałem, że was opuszczę. Do dobrego zwyczaju należy napisanie pożegnalnego wiersza, ale nie jestem ani poetą, ani kaligrafem. Niech jeden z was spisze moje ostatnie słowa.

Uczniowie znowu pomyśleli, że mistrz żartuje, ale jeden z nich zaczął pisać.

- Jesteś gotowy? - zapytał Hoshin.

- Tak, mistrzu - odparł pisarz.

Następnie Hoshin podyktował następujący wiersz:

Pochodzę od blasku

 I powracam do blasku.

 Co to jest?

Wiersz był krótszy o jeden wers od powszechnie przyjętej formy składającej się z czterech wersów, dlatego uczeń powiedział:

- Mistrzu brakuje jeszcze jednej linijki.

Hoshin, rycząc niczym zwycięski lew, krzyknął:

- Kaa!

I już go nie było`);

add(11, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-11.php', 'Historia Shunkai',
`Piękna Shunkai, nazywana również Suzu, wbrew swej woli została w młodości zmuszona do zamążpójścia. Później, kiedy małżeństwo już się rozpadło, uczęszczała na uniwersytet, gdzie studiowała filozofię.

Ludzie powiadali, że ujrzeć Shunkai oznacza zakochać się w niej. Co więcej, dokądkolwiek się udała, sama w kimś się zakochiwała. Miłość towarzyszyła jej na uniwersytecie, a potem, gdy okazało się, że filozofia nie dała jej spełnienia i odwiedzała świątynie w celu poznania zen, zakochiwał się w niej jeden mnich po drugim. Całe życie Shunkai było nasycone miłością.

Wreszcie w Kioto stała się prawdziwą adeptką zen. Współbracia ze świątyni w Kennin chwalili jej szczerość. Jeden z nich okazał się bratnią duszą kobiety i pomagał jej w osiągnięciu mistrzostwa w zen.

Opat Kennin, Mokurai - Milczący Grom był bardzo wymagający. Przestrzegał wszystkich zakazów oraz obowiązków i oczekiwał tego samego od mnichów. We współczesnej Japonii cały zapał mnichów dla buddyzmu zdawał się przekształcać w zapał do posiadania żon. Dlatego Mokurai na widok kobiet w swojej świątyni zwykł chwytać za miotłę i przeganiać je. Niestety wydawało się, że im więcej kobiet przegonił, tym więcej się pojawiało.

W tej właśnie świątyni żona głównego kapłana stała się bardzo zazdrosna o sumienność i urodę Shunkai. Słysząc jak uczniowie chwalą jej gorliwość w studiowaniu zen, żona cierpiała niemiłosiernie. W końcu zaczęła rozpowszechniać plotki o Shunkai i młodym człowieku, który był jej przyjacielem. W konsekwencji zarówno ów młodzieniec, jak i Shunkai zostali wydaleni ze świątyni

- Być może popełniłam błąd budząc ponownie uczucie miłości - myślała Shunkai - ale również żona głównego kapłana nie ma prawa pozostawać w świątyni, skoro mój przyjaciel został tak niesprawiedliwie potraktowany.

Tej samej nocy Shunkai spaliła liczącą pięćset lat świątynię, niszcząc ją doszczętnie. Rankiem została aresztowana przez policję.

Młody prawnik zainteresował się nią i próbował wywalczyć złagodzenie wyroku.

- Nie pomagaj mi - powiedziała do niego Shunkai. - Mogłabym zrobić coś, co zaprowadzi mnie z powrotem do więzienia.

W końcu siedmioletni wyrok pozbawienia wolności zakończył się i Shunkai została wypuszczona z więzienia. Także tutaj miłość nie opuszczała kobiety - zakochał się w niej bowiem sześćdziesięcioletni naczelnik więzienia.

Teraz jednak każdy traktował ją jak przestępcę. Nikt nie chciał mieć z nią do czynienia. Nawet wyznawcy zen, którzy powinni wierzyć w oświecenie w tym życiu i ciele, unikali jej. Shunkai przekonała się, że zen to jedno, a jego wyznawcy coś zupełnie innego. Jej krewni również nie chcieli jej przyjąć do siebie. W krótkim czasie rozchorowała się, popadła w nędzę i znacznie osłabła.

Spotkała kapłana Shinshu, który nauczył jej imienia Buddy Miłości i w tym Shunkai znalazła pewne ukojenie i spokój. Zmarła licząc sobie zaledwie trzydzieści lat, wciąż będąc piękną kobietą.

Spisała historię swoich próżnych wysiłków zmierzających ku oświeceniu, a część z tej historii opowiedziała pewnej pisarce. Dzięki temu o przeżyciach Shunkai mogli dowiedzieć się wszyscy Japończycy. Ci, którzy odrzucili ją, którzy ją oczerniali i nienawidzili, teraz czytają o jej życiu ze łzami żalu w oczach.`);

add(12, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-12.php', 'Szczęśliwy Chińczyk',
`Każdy turysta odwiedzający chińską dzielnicę w którymś z amerykańskich miast zobaczy posągi tęgiego człowieka niosącego lniany worek. Chińscy kupcy nazywają go Szczęśliwym Chińczykiem lub Uśmiechniętym Buddą.

Hotei żył za czasów dynastii T'ang . Był przeciwny nazywaniu siebie mistrzem i nie chciał gromadzić wokół siebie wielu uczniów. Zamiast tego wolał spacerować po ulicach z dużym workiem na plecach, do którego wkładał otrzymywane dary - głównie słodycze, owoce i przeróżne ciasta. Następnie rozdawał je napotykanym dzieciom, które z radością się wokół niego zbierały. W końcu Hotei założył uliczne przedszkole.

Za każdym razem, gdy spotykał adepta zen, wyciągał w jego kierunku rękę i mówił:

- Daj mi jeden grosz.

Pewnego razu, kiedy zajmował się dziećmi, podszedł doń mistrz zen i zapytał:

- Jakie znaczenie ma zen?

W milczącej odpowiedzi Hotei natychmiast upuścił swój worek na ziemię.

- A zatem - dopytywał się mistrz - co oznacza praktyka zen?

Szczęśliwy Chińczyk od razu zarzucił worek na ramię i poszedł w swoją stronę.`);

add(13, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-13.php', 'Budda',
`W epoce Meiji w Tokio mieszkało dwóch wybitnych mistrzów zen, którzy diametralnie różnili się w swoich charakterach. Jeden z nich, Unsho - instruktor z Shingon , bardzo skrupulatnie przestrzegał zaleceń Buddy. Nigdy nie pił alkoholu, ani nie jadł po jedenastej rano. Drugi z nauczycieli, Tanzan, profesor filozofii Cesarskiego Uniwersytetu, nigdy nie trzymał się buddyjskich reguł. Kiedy robił się głodny - jadł, kiedy miał ochotę zdrzemnąć się w ciągu dnia - robił to bez ogródek.

Pewnego dnia Unsho odwiedził Tanzana, akurat raczącego się winem - napojem, którego nawet kropla nie powinna przecież dotknąć języka buddysty.

- Witaj, bracie - powitał go Tanzan. - Napijesz się ze mną?

- Nigdy nie piję wina! - Unsho oznajmił uroczyście.

- Nie można nazwać człowiekiem kogoś, kto nie pije wina - powiedział Tanzan.

- Czy to znaczy, że odmawiasz mi człowieczeństwa tylko dlatego, że nie oddaję się we władanie napojom alkoholowym? - zawołał rozgniewany Unsho. - Skoro nie jestem człowiekiem, czym jestem?

- Buddą - odparł Tanzan.`);

add(14, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-14.php', 'Błotnista droga',
`Pewnego razu Tanzan i Ekido podróżowali błotnistą drogą. Wciąż padał rzęsisty deszcz. Za zakrętem spotkali piękną dziewczynę w jedwabnym kimonie przepasanym szarfą, która nie mogła przejść na drugą stronę drogi.

- Chodź, dziewczyno - powiedział bez wahania Tanzan, biorąc ją na ramiona i przenosząc przez błoto.

Ekido nic nie mówił aż do późnego wieczora, kiedy to dotarli do świątyni. Wówczas nie potrafił się już dłużej powstrzymywać.

- My mnisi nie powinniśmy zbliżać się do kobiet - powiedział do Tanzana. - Zwłaszcza młodych i pięknych. To niebezpieczne. Dlaczego to zrobiłeś?

- Zostawiłem dziewczynę na skraju błotnistej drogi - odparł Tanzan. - Ty najwyraźniej nadal ją niesiesz.`);

add(15, 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-15.php', 'Shoun i jego matka',
`Shoun został nauczycielem zen soto. Kiedy był jeszcze studentem, zmarł jego ojciec, czyniąc zeń jedynego opiekuna starej matki.

Gdy Shoun chodził do sali medytacyjnej, jego matka szła wraz z nim. Ponieważ towarzyszyła mu również wtedy, gdy odwiedzał klasztory, nie mógł mieszkać z mnichami. Wybudował zatem mały domek, w którym mógł się nią opiekować. Zajmował się kopiowaniem buddyjskich sutr, żeby zarobić parę monet na jedzenie.

Kiedy Shoun kupował ryby dla matki, ludzie z niego szydzili. Mnich nie powinien bowiem spożywać ryb. Shoun nie przejmował się tym. Jednakże jego matka nie pozostawała obojętna na to, jak inni drwili z jej syna. W końcu powiedziała Shounowi:

- Chyba zostanę mniszką. Również mogę być wegetarianką.

Tak zrobiła i razem zaczęli studiować sutry.

Shoun bardzo lubił muzykę i był mistrzem gry na harfie, na której jego matka również grała. Zwykli grywać razem podczas pełni księżyca.

Pewnej nocy młoda dama przechodziła w pobliżu ich chaty i usłyszała muzykę.

Głęboko poruszona, poprosiła Shouna, by ten odwiedził ją następnego wieczora i zagrał dla niej. Przyjął zaproszenie.

Kilka dni później spotkał przypadkiem młodą damę na ulicy i podziękował jej za gościnę. Inni ludzie śmiali się z niego, ponieważ owa dama była prostytutką.

Pewnego dnia Shoun wyjechał do odległej świątyni, by wygłosić wykład. Gdy po kilku miesiącach wrócił, dowiedział się, że jego matka nie żyje. Przyjaciele nie wiedzieli jak się z nim skontaktować, więc uroczystości pogrzebowe już trwały.

Shoun podszedł do trumny i uderzył ją swoją laską.

- Matko, twój syn powrócił - powiedział.

- Cieszę się z twojego powrotu, synu - odpowiedział zamiast matki.

- Tak, ja również się cieszę - odpowiedział Shoun w swoim imieniu, a następnie zwrócił się do zebranych osób:

- Ceremonia właśnie dobiegła końca. Możecie pochować ciało.

Kiedy Shoun był już stary, wiedział, że jego koniec jest bliski. Poprosił swoich uczniów, by zebrali się wokół niego nad ranem, jednocześnie informując, że odejdzie w południe. Paląc kadzidło przed obrazem matki i swojego starego mistrza, napisał wiersz:

Przez pięćdziesiąt sześć lat żyłem najlepiej, jak potrafiłem,

Krocząc swoją drogą przez ten świat.

Teraz deszcz przestaje padać, chmury rozstępują się.

Na błękitnym niebie dostrzegam pełnię księżyca.

Jego uczniowie zgromadzili się przy nim i rozpoczęli recytowanie sutr. Shoun odszedł podczas inwokacji.`);

writeFileSync('I:\\ZEN\\scripts\\polish_koans_cache.json', JSON.stringify(cache, null, 2), 'utf8');
console.log('Saved ' + Object.keys(cache).length + ' entries');
