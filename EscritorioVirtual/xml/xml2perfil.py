import xml.etree.ElementTree as ET
ns = {
    't': 'http://tempuri.org/rutas'
}
doc = ET.parse('rutasEsquema.xml')
rutas_turisticas_ele = doc.getroot()
cont =1
for rutas_ele in rutas_turisticas_ele.findall('./t:ruta', ns):
    nombre_archivo = f"perfil{cont}.svg"
    coordenadas =[]
    with open(nombre_archivo, "w") as archivo:
        altura =  rutas_ele.find('./t:coordenada_inicio/t:altitud', ns).text
        coordenadas.append(altura)
        for coordenada_ele in rutas_ele.findall('./t:hitos/t:hito/t:coordenadaHito',ns):
            alt = coordenada_ele.find('./t:altitud', ns).text
            coordenadas.append(alt)
        max_element =0
        for elemento in coordenadas:
            numero_entero = int(elemento)
            if numero_entero > max_element: max_element = numero_entero
        dx = 200/ (len(coordenadas)-1)
        ancho=0
        coordenadasSVG = []
        for elemento in coordenadas :
            numero_entero = int(elemento) 
            alto = 100-(100*(numero_entero/max_element)) 
            coordenadasSVG.append(f"{ancho},{alto}")
            ancho+=dx
        ##coordenadasArchivo='0,100 ' + ' '.join(coordenadasSVG) + ' 200,100'
        coordenadasArchivo=' '.join(coordenadasSVG)
        archivo.write('<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">')
        archivo.write('<polyline points= "')
        archivo.write(coordenadasArchivo)
        archivo.write('" style="fill:black;stroke:black;stroke-width:1" />')
        archivo.write('</svg>')
    cont+=1
       