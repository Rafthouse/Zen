import { readFileSync, writeFileSync } from 'fs';

const cachePath = 'I:\\ZEN\\scripts\\polish_koans_cache.json';
const cache = JSON.parse(readFileSync(cachePath, 'utf8'));

function add(num, url, title, text) {
  cache[url] = { url, num, plTitle: title, text, textLength: text.length };
}

add(16,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-16.php','Niedaleko od stanu Buddy',
`Pewien student podczas wizyty u Gasana, zapytał go:

- Czy czytałeś kiedykolwiek chrześcijańską Biblię?

- Nie - odparł Gasan. - Przeczytaj mi ją.

Student otworzył Bibilię i zaczął czytać fragment z ewangelii według św. Mateusza: "A o odzienie czemu zbytnio się troszczycie? Przypatrzcie się liliom na polu, jak rosną: nie pracują ani przędą. A powiadam wam: nawet Salomon w całym swoim przepychu nie był tak ubrany jak jedna z nich. […] Nie troszczcie się więc zbytnio o jutro, bo jutrzejszy dzień sam o siebie troszczyć się będzie" .

- Ten, kto wypowiedział te słowa jest według mnie człowiekiem oświeconym - stwierdził Gasan.

Student czytał dalej: "Proście, a będzie wam dane; szukajcie, a znajdziecie; kołaczcie, a otworzą wam. Albowiem każdy, kto prosi, otrzymuje, kto szuka, znajduje; a kołaczącemu otwierają" .

- To jest doskonałe - powiedział Gasan. - Ten, kto to powiedział nie był daleko od stanu Buddy.`);

add(17,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-17.php','Powściągliwy w nauczaniu',
`Młody tokijski lekarz o nazwisku Kusuda spotkał kolegę z czasów studiów, który praktykował zen. Młody doktor zapytał go, czym jest zen.

- Nie mogę powiedzieć ci czym jest zen - odpowiedział przyjaciel - ale jedno jest pewne. Jeśli zrozumiesz zen, nigdy nie będziesz obawiał się śmierci.

- Świetnie - powiedział Kusuda - spróbuję tego. Gdzie mogę znaleźć nauczyciela?

- Idź do mistrza Nan-ina - poradził przyjaciel.

Kusuda udał się więc do wskazanego człowieka. Zabrał ze sobą sztylet o ostrzu długim na dziewięć i pół cala, by sprawdzić czy nauczyciel boi się śmierci. Ujrzawszy Kusudę, Nan-in zawołał:

- Witaj, przyjacielu. Jak się masz? Nie wiedzieliśmy się tyle czasu!

- Przecież my się nigdy nie spotkaliśmy - odpowiedział zdumiony Kusuda.

- Rzeczywiście - odparł Nan-in. - Pomyliłem cię z innym lekarzem, który pobierał u mnie nauki.

Po takim początku rozmowy Kusuda stracił szansę na poddanie nauczyciela zaplanowanej próbie. Zapytał zatem niechętnie, czy może otrzymać naukę zen.

- Zen nie jest trudny - powiedział Nan-in. - Skoro jesteś lekarzem, dobrze traktuj swoich pacjentów. To jest zen.

Kusuda odwiedził Nan-ina trzy razy. Za każdym razem usłyszał to samo.

- Lekarz nie powinien marnować tutaj czasu. Wracaj do domu i zajmij się swoimi pacjentami.

Dla Kusudy nie było jeszcze jasne, jak taka nauka może wybawić go od strachu przed śmiercią.

- Mój przyjaciel powiedział mi, że osoba, która pozna zen, przestanie bać się śmierci. Ilekroć tu przychodzę, mówisz mi, żebym zajął się swoimi pacjentami. Tyle to sam wiem. Jeśli to jest twoje tak zwane zen, więcej już tu nie przyjdę.

Nan-in uśmiechnął się i poklepał doktora po ramieniu.

- Byłem dla ciebie zbyt surowy. Pozwól, że dam ci koan - wręczył Kusudzie koan zatytułowany "Pies Joshu", by ten mógł go przemyśleć. Jest to pierwsza oświecająca umysł łamigłówka wchodząca w skład księgi zatytułowanej "Bezbramna brama".

Kusuda rozmyślał nad problemem psa Joshu przez dwa lata, aż wreszcie uznał, że osiągnął pewność umysłu. Jego nauczyciel odpowiedział tylko, że jeszcze nie.

Kusuda kontynuował kontemplację w najwyższym skupieniu przez kolejne półtora roku. Jego umysł uspokoił się. Problemy zniknęły. Nicość stała się prawdą. Dobrze służył swoim pacjentom i, nawet o tym nie wiedząc, uwolnił się od zmartwień na temat życia i śmierci.

Kiedy odwiedził Nan-ina, stary nauczyciel uśmiechnął się tylko.`);

add(18,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-18.php','Przypowieść',
`Budda zawarł w sutrze pewną historię:

Człowiek przechodzący przez pole natknął się na tygrysa. Zaczął uciekać, lecz tygrys podążył za nim. Kiedy mężczyzna dobiegł do przepaści, chwycił korzeń dzikiej winorośli i zaczął się zsuwać w dół. Tygrys węszył za nim w górze. Drżąc ze strachu, mężczyzna spojrzał w dół. Daleko na dnie przepaści drugi tygrys czekał już na niego. Jedyną nicią łączącą go z życiem była winorośl.

Dwie myszy, jedna biała, druga czarna, zaczęły powoli podgryzać łodygę winorośli. To oznaczało koniec. Jednak mężczyzna spostrzegł soczystą truskawkę rosnącą w pobliżu. Przytrzymując się winorośli jedną ręką, sięgnął po owoc. Jakże był słodki!`);

add(19,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-19.php','Pierwsza Zasada',
`Kiedy wchodzi się do świątyni Obaku w Kioto, można zobaczyć wyryte na bramie słowa: "Pierwsza Zasada". Niezwykłych rozmiarów litery są bardzo cenione przez miłośników kaligrafii, którzy uważają je za prawdziwe dzieło sztuki. Napis powstał dzięki Kosenowi, ponad dwieście lat temu.

 Mistrz wypisał litery na papierze, który posłużył jako wzorzec dla robotników wycinających je w powiększonej wersji w drewnie. Podczas szkicowania liter, Kosenowi towarzyszył arogancki uczeń, który na potrzeby mistrza przygotował kilka litrów atramentu i nie przestawał krytykować jego pracy.

- Ten napis nie jest dobry - powiedział Kosenowi po pierwszej próbie.

- A jak ten wygląda?

- Kiepsko. Nawet gorzej niż poprzednia wersja - oświadczył uczeń.

Kosen cierpliwie zapisywał jeden arkusz papieru za drugim, aż zebrały się osiemdziesiąt cztery "Pierwsze Zasady". Nadal jednak żadna nie zyskała aprobaty ucznia.

Wówczas, gdy młody człowiek wyszedł na kilka chwil, Kosen pomyślał: "Teraz mam szansę uniknąć jego bystrego oka" i pospiesznie, z umysłem wolnym od rozproszenia, napisał "Pierwsza Zasada".

- Arcydzieło - orzekł uczeń po powrocie.`);

add(20,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-20.php','Rada matki',
`Jiun, mistrz Shingon, był dobrze znanym uczonym sanskryckim w epoce Tokugawa. W młodości zwykł dawać wykłady swoim kolegom studentom.

Usłyszała o tym jego matka, dlatego napisała doń list:

"Synu, nie sądzę, żebyś studiował nauki Buddy po to tylko, by być dla innych chodzącym słownikiem pojęć. Definicjom i komentarzom, podobnie jak chwale i honorowi, nie ma końca. Wolałabym jednak, żebyś skończył z tymi wykładami. Zamieszkaj w jakiejś małej świątyni daleko w górach. Poświęć swój czas na medytację i tą drogą osiągnij prawdziwe urzeczywistnienie."`);

add(21,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-21.php','Dźwięk jednej dłoni',
`Mistrzem świątyni Kennin był Mokurai, Milczący Grom. Opiekował się małym, zaledwie dwunastoletnim chłopcem zwanym Toyo. Toyo widział jak starsi uczniowie odwiedzają pokój mistrza każdego ranka i wieczora, by otrzymać nauki sanzen lub osobistą poradę. Za każdym razem dostawali oni od mistrza koany, by powstrzymać umysły od błądzenia.

Toyo również zapragnął praktykować sanzen.

- Poczekaj jeszcze trochę - powiedział Mokurai. - Jesteś za młody.

Jednakże dziecko nalegało, więc nauczyciel ostatecznie wyraził zgodę.

Wieczorem, o odpowiedniej porze, mały Toyo przekroczył próg pokoju mistrza. Uderzył w gong, by obwieścić swoje przybycie i skłonił się z szacunkiem trzy razy za drzwiami. Wszedł i usiadł w pełnym szacunku milczeniu.

- Kiedy klaszczesz, słyszysz dźwięk wydający przez dwie uderzające o siebie dłonie - powiedział Mokurai. - A teraz, pokaż mi dźwięk, jaki wydaje jedna dłoń.

 Toyo pokłonił się i wrócił do swojego pokoju, by przemyśleć problem. Ze swojego okna mógł usłyszeć muzykę graną przez gejsze.

- Ach, już wiem! - oznajmił.

Następnego wieczoru, kiedy mistrz poprosił go o zademonstrowanie dźwięku jednej dłoni, Toyo zaczął grać muzykę gejsz.

- Nie, nie - powiedział Mokurai. - To nie jest odpowiednie rozwiązanie. To nie jest dźwięk jednej dłoni. W ogóle tego nie pojmujesz.

Uznając, że muzyka może mu przeszkadzać, Toyo przeprowadził się do innego pokoju, o wiele cichszego. Po raz kolejny rozpoczął medytację.

- Jaki dźwięk może wydawać jedna dłoń? - zastanawiał się, kiedy przypadkiem usłyszał kapiącą wodę. - Już wiem! - pomyślał.

Kiedy ponownie pojawił się u mistrza, zaczął naśladować kapiącą wodę.

- Co to ma być? - zapytał Mokurai. - To dźwięk kapiącej wody, a nie jednej dłoni. Spróbuj jeszcze raz.

Na próżno Toyo medytował nad dźwiękiem jednej dłoni. Słyszał westchnienia wiatru, ale i ten został przez mistrza odrzucony. Usłyszał pohukiwania sowy, ale to również nie zostało zaakceptowane. Odgłosem jednej dłoni nie był również dźwięk wydawany przez szarańczę.

Ponad dziesięć razy Toyo odwiedzał mistrza z różnymi dźwiękami. Wszystkie były niewłaściwe. Prawie przez rok zastanawiał się jak może brzmieć dźwięk jednej dłoni.

W końcu Toyo wszedł w prawdziwy stan medytacyjny i wykroczył poza wszystkie dźwięki.

- Nie mogłem znaleźć już więcej - wyjaśniał później - więc sięgnąłem po bezdźwięczny dźwięk.

Toyo urzeczywistnił dźwięk jednej dłoni.`);

add(22,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-22.php','Moje serce płonie jak ogień',
`Soyen Shaku, pierwszy mistrz zen, który przyjechał do Ameryki, powiedział:

- Moje serce płonie jak ogień, ale oczy są zimne niczym popiół.

To właśnie on opracował poniższe reguły i praktykował je każdego dnia swojego życia.

- Rano, zanim się ubierzesz, rozpalaj kadzidło i medytuj;

- Udawaj się na spoczynek o stałej godzinie. Posiłki spożywaj w równych odstępach czasu. Jedz z umiarem i nigdy nie zaspokajaj głodu w pełni;

- Zachowuj się tak samo zarówno, gdy jesteś sam, jak i kiedy przyjmujesz gości;

- Uważaj na swoje słowa, a wszystko co mówisz realizuj w praktyce;

- Nie przepuszczaj nadarzającej się okazji, jednakże zawsze pomyśl dwa razy, zanim cokolwiek zrobisz;

- Nie żałuj przeszłości, patrz w przyszłość;

- Miej nieustraszone nastawienie bohatera i kochające serce dziecka;

- Udając się na spoczynek, śpij tak, jakby to miał być twój ostatni sen. Gdy się budzisz, wstawaj natychmiast. Zostawiaj łóżko tak, jakbyś wyrzucał parę starych butów.`);

add(23,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-23.php','Odejście Eshun',
`Kiedy Eshun, mniszka zen, przekroczyła już sześćdziesiątkę i była bliska odejścia z tego świata, poprosiła mnichów, by zebrali trochę drewna na podwórzu.

Usadowiwszy się porządnie na szczycie pogrzebowego stosu, kazała podłożyć na jego skraju ogień.

- Siostro - krzyknął jeden z mnichów. - Czy tam jest gorąco?

- To może zainteresować tylko kogoś tak głupiego, jak ty - opowiedziała Eshun.

Płomienie strzeliły w górę i mniszka odeszła z tego świata.`);

add(24,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-24.php','Recytowanie sutr',
`Pewien rolnik poprosił kapłana Tendai o wyrecytowanie sutr dla jego zmarłej żony. Po zakończeniu recytacji, rolnik zapytał:

- Myślisz, że moja żona zyska dzięki temu łaskę?

- Nie tylko twoja żona, ale wszelkie czujące istoty odnoszą korzyści z recytacji sutr - odrzekł kapłan.

- Skoro twierdzisz, że korzyść odniosą wszystkie czujące istoty - powiedział farmer - moja żona może otrzymać mniej łaski, na czym skorzystają inni, gdyż otrzymają to, co ona powinna. Proszę, wyrecytuj sutry tylko dla niej.

Kapłan wyjaśnił, że pragnieniem buddysty jest nieść błogosławieństwo wszystkim istotom żyjącym.

- To dobra nauka - stwierdził rolnik - ale proszę, zrób ten jeden wyjątek. Mam sąsiada, który jest opryskliwy i złośliwy wobec mnie. Wystarczy wykluczyć go z grona istot czujących.`);

add(25,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-25.php','Trzy dni więcej',
`Suiwo, szkolony przez Hakuina, był dobrym nauczycielem. Podczas jednego z okresów letniego odosobnienia, odwiedził go uczeń z jednej z południowych wysp Japonii.

Suiwo przedstawił mu koan "Dźwięku jednej dłoni".

Uczeń pozostał przy Suiwo przez trzy lata, ale nie potrafił przejść tego testu. Pewnej nocy przyszedł do nauczyciela załamany.

- Muszę powrócić na południe okryty hańbą i przepełniony wstydem - powiedział - ponieważ nie potrafię rozwiązać tego problemu.

- Poczekaj jeszcze tydzień i cały czas medytuj - poradził Suiwo, lecz po siedmiu dniach na ucznia nadal nie spłynęło oświecenie.

- Spróbuj jeszcze przez tydzień - powiedział Suiwo. Uczeń posłuchał, lecz na próżno.

- Jeszcze jeden tydzień.

To również nie przyniosło skutku, więc zrozpaczony uczeń poprosił o zwolnienie. Suiwo jednak poprosił o jeszcze pięć dni medytacji. Przeminęły bez rezultatu.

- Pomedytuj jeszcze przez trzy dni - powiedział wówczas. - Jeśli ci się to nie uda, to lepiej się zabij.

Drugiego dnia uczeń doznał oświecenia.`);

add(26,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-26.php','Dyskusja o zakwaterowaniu',
`Każdy wędrowny mnich, który rozpocznie i wygra dyskusję o buddyzmie z tymi, którzy mieszkają w świątyni zen, może w niej pozostać. Jeśli jednak przegra pojedynek na argumenty, musi iść dalej.

W świątyni w północnej części Japonii mieszkali razem dwaj mnisi, którzy byli braćmi. Starszy z nich był bardzo mądry, natomiast młodszy był głupi i miał tylko jedno oko.

Pewnego dnia przyszedł do nich wędrowny mnich i poprosił o gościnę, wyzywając ich - w przyjęty zwyczajem sposób - do rozpoczęcia debaty o wzniosłej nauce. Starszy z braci, zmęczony po całodziennych praktykach, kazał młodszemu zająć swoje miejsce.

- Idź i poproś o dialog w milczeniu - ostrzegł go.

Młody mnich i przybysz udali się zatem do świątyni i usiedli. Po chwili podróżnik wstał i podszedł do starszego z braci.

- Twój młodszy brat jest wspaniałym człowiekiem - powiedział. - Pokonał mnie.

- Czy możesz opowiedzieć mi o waszej dyskusji? - zapytał starszy mnich ze zdziwieniem.

- No cóż - wyjaśnił podróżny - najpierw podniosłem jeden palec, przedstawiający Buddę, oświeconego. Wówczas on podniósł dwa palce, wskazując na Buddę oraz jego nauki. Podniosłem trzy palce, które miały reprezentować Buddę, jego nauki oraz jego wyznawców, wiodących harmonijne życie. Wtedy on potrząsnął mi przed oczyma zaciśniętą pięścią, wskazując, że wszystkie trzy pochodzą z jednego urzeczywistnienia. W ten sposób wygrał, dlatego nie mam prawa tutaj przebywać.

Po tych słowach podróżny wyszedł i ruszył w dalszą drogę.

- Gdzie się podział ten człowiek? - zapytał młody mnich, przybiegając do starszego brata.

- Rozumiem, że zwyciężyłeś w dyskusji.

- Nic nie wygrałem. Zbiję go na kwaśne jabłko!

- Powiedz mi, o czym rozmawialiście - poprosił starszy.

- Tak więc, jak tylko mnie zobaczył, podniósł obraźliwie jeden palec, drwiąc z mojego jednego oka. Skoro był obcym, pomyślałem, że będę uprzejmy i podniosłem dwa palce, gratulując mu posiadania obojga oczu. Wtedy ten bezczelny kmiotek uniósł trzy palce, wskazując, że razem mamy tylko troje oczu. W tym momencie wściekłem się i chciałem go palnąć pięścią, ale on uciekł. W ten sposób zakończył wszystko.`);

add(27,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-27.php','Głos szczęścia',
`Po śmierci mistrza Bankei, mieszkający w pobliżu świątyni ślepiec powiedział do przyjaciela:

- Odkąd jestem niewidomy, nie widzę niczyjej twarzy i muszę oceniać ludzki charakter po brzmieniu głosu. Zazwyczaj, kiedy ktoś komuś gratuluje sukcesu bądź szczęścia, słyszę w jego głosie również głęboko ukryty ton zazdrości. Kiedy ktoś składa wyrazy współczucia z powodu czyjegoś nieszczęścia, ja słyszę radość i satysfakcję, jakby składający kondolencje naprawdę się cieszył i uważał, że sam może dzięki temu coś zyskać. Jednakże głos Bankei był zawsze szczery, przez cały czas, jaki mieszkałem w sąsiedztwie jego świątyni. Ilekroć doświadczał szczęścia, w jego głosie nie słyszałem niczego poza szczęściem. Ilekroć wyrażał smutek, smutek tylko słyszałem.`);

add(28,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-28.php','Otwórz swój skarbiec',
`Daiju pewnego razu odwiedził w Chinach mistrza Baso.

- Czego poszukujesz? - zapytał Baso.

- Oświecenia - odparł Daiju.

- Masz własny skarbiec. Dlaczego szukasz skarbów na zewnątrz? - zapytał Baso.

- A gdzie jest mój skarbiec? - dopytywał się Daiju.

- To, o co pytasz, jest twoim skarbcem - odpowiedział Baso.

Daiju był zachwycony! Od tego czasu namawiał swoich przyjaciół:

- Otwórzcie swoje skarbce i korzystajcie z ukrytych w nich bogactw.`);

add(29,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-29.php','Bez wody nie ma księżyca',
`Kiedy mniszka Chiyono studiowała zen pod okiem mistrza Bukkko z Engaku, przez bardzo długi czas nie potrafiła uzyskać dostępu do owoców medytacji.

Pewnej nocy, kiedy księżyc był w pełni, niosła wodę w starym wiadrze, powiązanym pędami bambusa. Pędy zerwały się i dno wiadra odpadło. W tym momencie Chiyono wyzwoliła się!

Napisała taki oto poemat, by upamiętnić ową chwilę:

Próbowałam naprawić stare wiadro na różne sposoby,

Odkąd bambusowe wiązanie stawało się coraz słabsze i miało lada dzień pęknąć.

W końcu jednak dno wiadra odpadło.

Nie będzie więcej wody w wiadrze!
Nie będzie więcej księżyca w wodzie!`);

add(30,'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-30.php','Wizytówka',
`Keichu, wielki nauczyciel zen z epoki Meiji, zarządzał Tofuku, katedrą w Kioto. Pewnego dnia przybył do niego gubernator Kioto. Nigdy wcześniej się nie spotkali.

Asystent mistrza przyniósł wizytówkę, na której było napisane: Kitagaki, Gubernator Kioto.

- Nie chcę mieć nic wspólnego z takim człowiekiem - powiedział Keichu do swojego ucznia. - Powiedz mu, żeby się stąd zabierał.

Asystent zwrócił wizytówkę z przeprosinami.

- Nie przepraszaj, to moja wina - powiedział gubernator i ołówkiem skreślił z wizytówki słowa: "Gubernator Kioto". - Zapytaj swojego mistrza jeszcze raz.

- O, czyż to nie Kitagaki? - zawołał nauczyciel ujrzawszy wizytówkę. - Z tym człowiekiem chcę się zobaczyć.`);

writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
console.log('Saved ' + Object.keys(cache).length + ' entries');
